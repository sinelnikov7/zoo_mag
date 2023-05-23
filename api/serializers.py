from rest_framework import serializers

from catalog.models import ProductCategory, Article, Feedback, Brand, Product, AnimalCategory


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        # fields = '__all__'
        exclude = ('owner',)


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brand
        depth = 1
        fields = ('id','name','image', 'product_set',)

class ProductSerializer(serializers.ModelSerializer):
    # productcategory = ProductCategorySerializer()
    # brand = BrandSerializer()
    class Meta:
        model = Product
        exclude = ('author',)
        depth = 1



class AnimalCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = AnimalCategory
        depth = 1
        fields = '__all__'



