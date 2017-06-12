"""love_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
"""
from rest_framework import routers
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.authtoken.views import obtain_auth_token
from .methods import *
from .views import *

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'relcheck', views.RelCheckViewSet, 'relcheck')

router.register(r'limited_norel', views.LimitedNoRelViewSet, 'limited_norel')

router.register(r'profiles', views.ProfileViewSet)
router.register(r'relationships', views.RelationshipViewSet)
router.register(r'numbers', views.ImportantNumberViewSet)
router.register(r'messages', views.MessageViewSet)
router.register(r'photos', views.PhotoViewSet)
router.register(r'calendar', views.TodoCalendarViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
	url(r'^', include(router.urls)),
    url(r'^register/', register_user),
    url(r'^api-token-auth/', obtain_auth_token),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
