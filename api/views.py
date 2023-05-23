from rest_framework import generics
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter

from catalog.models import ProductCategory, Article, Feedback, Brand, Product, AnimalCategory
from rest_framework.response import Response
from .paginators import NewProductPagination
from .serializers import ArticleSerializer, ProductSerializer


class ArticleAll(APIView):
    def get(self, request):
        get_data = Article.objects.all()
        ready_data = ArticleSerializer(get_data, many=True).data
        return Response(ready_data)

class NewProduct(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = NewProductPagination
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter,)
    ordering_fields = ('id',)


# Create your views here.
