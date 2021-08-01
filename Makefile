build:
	docker-compose build

run:
	docker-compose up

format:
	docker-compose run websocket poetry run black .

install:
	docker-compose run websocket poetry install

bashc:
	docker-compose run websocket /bin/bash

test:
	docker-compose run websocket poetry run pytest
