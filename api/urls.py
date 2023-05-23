from rest_framework import routers
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from .views import ArticleAll, NewProduct
from .viewsets import ArticleViewSet, FeedbackViewSet, BrandViewSet, ProductViewSet, AnimalCategoryViewSet, \
    ProductCategoryViewSet


router = routers.DefaultRouter()
router.register(r'article', ArticleViewSet, basename='article')
router.register(r'feedback', FeedbackViewSet, basename='feedback')
router.register(r'brand', BrandViewSet, basename='brand')
router.register(r'product', ProductViewSet, basename='product')
router.register(r'animal_category', AnimalCategoryViewSet, basename='animal_category')
router.register(r'product_category', ProductCategoryViewSet, basename='product_category')


schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [

    path('', include(router.urls)),
    # re_path(r'^swagger(?P\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    # path('feedback/', FeedbackViewSet.as_view({'get': 'list', 'post': 'create'})),
    # path('feedback/<int:pk>/', FeedbackViewSet.as_view({'get': 'retrieve'})),
    path('article_all/', ArticleAll.as_view()),
    path('new_product/', NewProduct.as_view())

]