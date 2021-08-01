from django.conf.urls import url
from boards.consumers import WhiteBoardConsumer

websocket_urlpatterns = [
    url(r"^ws/boards/(?P<board_code>\w+)/$", WhiteBoardConsumer.as_asgi()),
]
