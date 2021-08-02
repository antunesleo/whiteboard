import json
from channels.generic.websocket import AsyncWebsocketConsumer


class WhiteBoardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["board_code"]
        self.room_group_name = "board_%s" % self.room_name

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        text_data_json["type"] = "board_message"

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, text_data_json
        )

    # Receive message from room group
    async def board_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps(event))
