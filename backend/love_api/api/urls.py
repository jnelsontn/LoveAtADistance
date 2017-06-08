"""love_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers
from django.conf.urls import url, include
from django.contrib import admin
from .views import *

router = routers.DefaultRouter()
router.register(r'users', profile_view.UserViewSet)
router.register(r'profiles', profile_view.ProfileViewSet)
router.register(r'groups', profile_view.GroupViewSet)
router.register(r'connections', connection_view.ConnectionViewSet)
router.register(r'numbers', important_number_view.ImportantNumberViewSet)
router.register(r'messages', message_view.MessageViewSet)
router.register(r'photos', photo_view.PhotoViewSet)
router.register(r'calendar', todo_calendar_view.TodoCalendarViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
# call our methods here for front-end
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^register/', register_user_view.register_user),
    url(r'^admin/', admin.site.urls),
    url(r'^api-token-auth/', obtain_auth_token),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]




