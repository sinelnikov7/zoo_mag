from django.db.models import Count
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from .paginators import ArticleListPagination, FeedbackListPagination
from .permissions import IsOwnerOrReadOnly
from .serializers import ArticleSerializer, FeedbackSerializer, BrandSerializer, ProductSerializer, \
    AnimalCategorySerializer, ProductCategorySerializer
from catalog.models import ProductCategory, Article, Feedback, Brand, Product, AnimalCategory


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    pagination_class = ArticleListPagination
    permission_classes = (IsAuthenticatedOrReadOnly,) #IsOwnerOrReadOnly)

class FeedbackViewSet(mixins.CreateModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.ListModelMixin,
                       GenericViewSet):

    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    pagination_class = FeedbackListPagination

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.annotate(Count('product')).order_by('-product__count')
    serializer_class = BrandSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter] #IsOwnerFilterBackend ]
    filterset_fields = ['animalcategory', 'productcategory']
    ordering_fields = ['price', 'views', 'id', 'name', ]

    def get_queryset(self):

        if self.request.query_params:
            dict = self.request.query_params.keys()
            if 'brand' in  dict:
                value = self.request.query_params['brand'].replace(f',', '')
                value_id = [int(i) for i in value]
                self.queryset = self.queryset.filter(brand__in=value_id)
                return self.queryset
            else:
                return self.queryset
        else:
            return self.queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object().id
        value = Product.objects.get(id=instance)
        value.views += 1
        value.save()
        serializer = self.get_serializer(value)
        return Response(serializer.data)


class AnimalCategoryViewSet(viewsets.ModelViewSet):
    queryset = AnimalCategory.objects.all()
    serializer_class = AnimalCategorySerializer


class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
