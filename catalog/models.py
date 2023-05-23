from datetime import datetime
from os.path import splitext

from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models
from django.template.defaultfilters import slugify
from django.urls import reverse


class AdvUser(AbstractUser):
    tel = models.CharField(max_length=13)

    class Meta(AbstractUser.Meta):
        pass

def get_user_id(request):
    return request.user

def get_timestamp_path(instance, filename):
    return '%s%s' % (datetime.now().timestamp(), splitext(filename)[1])

# Категории животных
class AnimalCategory(models.Model):
    name = models.CharField(max_length=50, verbose_name='Категория животных')
    image = models.ImageField(blank=True, null=True, upload_to=get_timestamp_path, verbose_name='Изображение')
    slug = models.SlugField(null=False, blank=True, db_index=True, unique=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('animal_category', kwargs={'slug': self.slug})

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)

# Категории товара
class ProductCategory(models.Model):
    MEASURE = (
        ('кг.', 'кг.'),
        ('л.', 'л.'),
        ('шт.', 'шт.'),
        ('гр.', 'гр.'),
    )
    name = models.CharField(max_length=50, verbose_name='Категория товара')
    measure = models.CharField(max_length=20,choices=MEASURE)

    def __str__(self):
        return self.name

#Брэнд
class Brand(models.Model):
    name = models.CharField(max_length=50, verbose_name='Брэнд')
    image = models.ImageField(blank=True, null=True, upload_to=get_timestamp_path, verbose_name='Логотип')


    def __str__(self):
        return self.name

#Товар
class Product(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название товара')
    author = models.ForeignKey(AdvUser, on_delete=models.CASCADE, verbose_name='Автор')
    animalcategory = models.ManyToManyField(AnimalCategory, verbose_name='Категория животных', related_name='product')
    productcategory = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, verbose_name='Категория продукта')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, verbose_name='Брэнд')
    discription = models.TextField()
    image = models.ImageField(blank=True, null=True, upload_to=get_timestamp_path, verbose_name='Изображение')
    price = models.IntegerField(verbose_name='Стоимость')
    count = models.IntegerField(verbose_name='В наличии')
    first_offer = models.IntegerField(verbose_name='Первое предложение кол-ва', default=1)
    second_offer = models.IntegerField(verbose_name='Второе предложение кол-ва', default=1)
    views = models.IntegerField(verbose_name="Просмотры", default=0)

    def __str__(self):
        return self.name
    class Meta:
        ordering = ['-id']

class Feedback(models.Model):
    name = models.CharField(max_length=10, verbose_name='Имя')
    content = models.TextField(verbose_name='Контент')
    phone_regex = RegexValidator(regex=r'^\+375\d{9,9}$',
                                 message="Введите номер в формате +3753363785379")
    tel = models.CharField(max_length=14, verbose_name='Телефон', validators=[phone_regex])
    petName = models.CharField(max_length=50, verbose_name='Имя питомца')

    def __str__(self):
        return self.name

class Article(models.Model):
    image = models.ImageField(blank=True, null=True, upload_to=get_timestamp_path, verbose_name='Изображение')
    title = models.CharField(max_length=50, verbose_name='Заголовок')
    content = models.TextField(verbose_name='Контент')
    time_of_read = models.IntegerField(verbose_name='Время чтения в минутах')
    created_at = models.DateField(auto_now_add=True, blank=True, null=True)
    owner = models.CharField(max_length=50, default=1, blank=True, null=True)

    # def save(self, user_id):
    #     if not self.owner:
    #         self.owner = user_id
    #     return super().save()


    def __str__(self):
        return self.title
