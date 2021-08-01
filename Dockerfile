FROM python:3.9

WORKDIR /app
COPY ./pyproject.toml .

RUN apt-get update

RUN pip3 install poetry
RUN poetry config virtualenvs.create false --local
RUN poetry install

COPY . /app

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
