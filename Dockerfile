FROM python:3.9-bullseye

ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN apt update && apt install -y chromium
RUN python -m pip install  -r requirements.txt

RUN mkdir app
WORKDIR /app
COPY . /app

CMD ["python", "main.py"]