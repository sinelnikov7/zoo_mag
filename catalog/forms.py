from django import forms
from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError

from .models import AnimalCategory, AdvUser


class CatAnimal(forms.ModelForm):

    model = AnimalCategory
    fields = ('name')
    widgets = {'slug': forms.HiddenInput}


class RegisterUserForm(forms.ModelForm):
    email = forms.EmailField(required=True, label='Электронная почта', initial='')
    password = forms.CharField(label='Пароль', widget=forms.PasswordInput,
                                help_text=password_validation.password_validators_help_text_html())
    password2 = forms.CharField(label='Пароль(повторно)', widget=forms.PasswordInput,
                                help_text='Подтвердите введенный ранее пароль')

    def clean_password1(self):
        password = self.cleaned_data['password']
        if password:
            password_validation.validate_password(password)
        return password

    def clean(self):
        super().clean()
        password = self.cleaned_data['password']
        password2 = self.cleaned_data['password2']
        if password and password2 and password != password2:
            errors = {'password2': ValidationError(
                'Введенные пароли не совпадают', code='password_mismatch')}
            raise ValidationError(errors)

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        user.is_active = False
        if commit:
            user.save()
        return user

    def __init__(self, *args, **kwargs):
        super(RegisterUserForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'input'

    class Meta:
        model = AdvUser
        fields = ('username', 'email', 'password', 'password2')
