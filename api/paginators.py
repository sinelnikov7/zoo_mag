from rest_framework import pagination
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

default_page = 1

class FeedbackListPagination(PageNumberPagination):
    page_size = 1
    page_size_query_param = 'page_size'
    max_page_size = 10000

class ArticleListPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 10000

class NewProductPagination(pagination.PageNumberPagination):

    page = default_page
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 10000

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link(),
                'page_number': int(self.request.GET.get('page', default_page))
            },
            'count': self.page.paginator.count,
            'results': data
        })