"""love_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
"""
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from .settings import MEDIA_URL, MEDIA_ROOT
from django.conf.urls.static import static
from django.conf.urls import url, include
from rest_framework import routers
from django.contrib import admin
from .methods import *
from .views import *

router = routers.DefaultRouter()
router.register(r'numbers', important_number_viewset.ImportantNumberViewSet)
router.register(r'relationships', relationship_viewset.RelationshipViewSet)
router.register(r'notifications', notification_viewset.NotificationViewSet)
router.register(r'relcheck', limited_viewset.RelCheckViewSet, 'relcheck')
router.register(r'calendar', todo_calendar_viewset.TodoCalendarViewSet)
router.register(r'limited', limited_viewset.LimitedViewSet, 'limited')
router.register(r'messages', message_viewset.MessageViewSet)
router.register(r'profiles', profile_viewset.ProfileViewSet)
router.register(r'groups', group_viewset.GroupViewSet)
router.register(r'photos', photo_viewset.PhotoViewSet)
router.register(r'users', user_viewset.UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', obtain_auth_token),
    url(r'^register/', register_user),
    url(r'^admin/', admin.site.urls),
	url(r'^', include(router.urls)),
]

# For storing images on the server
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)