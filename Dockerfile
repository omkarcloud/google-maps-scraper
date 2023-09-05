FROM ultrafunk/undetected-chromedriver:106

ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN python -m pip install  -r requirements.txt

RUN mkdir app
WORKDIR /app
COPY . /app

CMD ["python", "main.py"]