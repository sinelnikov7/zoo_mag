from django.contrib import admin
from .models import *

class AniCatAdmin(admin.ModelAdmin):

    prepopulated_fields = {'slug': ('name',)}


admin.site.register(AdvUser)
admin.site.register(AnimalCategory, AniCatAdmin)
admin.site.register(ProductCategory)
admin.site.register(Brand)
admin.site.register(Product)
admin.site.register(Feedback)
admin.site.register(Article)
# Register your models here.
