from django.urls import path

from .views import index, RegisterUserView, UserLoginView, UserLogoutView

app_name = 'catalog'

urlpatterns = [

    path('', index, name='index'),
    path('accounts/register/', RegisterUserView.as_view(), name='register'),
    path('accounts/login/', UserLoginView.as_view(), name='login'),
    path('accounts/logout/', UserLogoutView.as_view(), name='logout'),

]