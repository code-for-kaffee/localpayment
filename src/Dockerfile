FROM python:3.8

WORKDIR /src

ENV FLASK_APP=app.py

COPY /src/requirements.txt .

RUN pip install -r requirements.txt

EXPOSE 5000

COPY . .

CMD ["flask", "run"]

# FROM python:3

# WORKDIR /src

# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt

# COPY . .

# CMD [ "python", "./app.py" ]