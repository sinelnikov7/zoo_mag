from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView, LogoutView
from django.db.models import Count, Avg
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView

from .forms import RegisterUserForm
from .models import AnimalCategory, Product, Brand, Feedback, Article, AdvUser


def index(request):
    category = AnimalCategory.objects.all()
    products = Product.objects.all()[:4]
    brands = Brand.objects.all()[:5]
    feedback = Feedback.objects.all()[:1]
    articles = Article.objects.all()[:3]
    context = {
        'category': category,
        'products': products,
        'brands': brands,
        'feedback': feedback,
        'articles': articles,
    }

    # brand = Brand.objects.annotate(Count('product')).order_by('-product__count')[:2]
    # prices = Brand.objects.annotate(Count('product__price'))
    # for price in prices:
        # print(price.product__price__count)
        # print(price)
        # print(dir(price))


    return render(request, 'index.html', context)


class RegisterUserView(CreateView):
    model = AdvUser
    template_name = 'register.html'
    form_class = RegisterUserForm
    success_url = reverse_lazy('catalog:index')

class UserLoginView(LoginView):
    template_name = 'login.html'
    success_url = reverse_lazy('catalog:index')

class UserLogoutView(LoginRequiredMixin, LogoutView):
    template_name = 'logout.html'
# Create your views here.
