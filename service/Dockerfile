FROM python:3.10.14-bullseye 

RUN apt-get update && apt-get install -y libgl1

WORKDIR /app
 
COPY . .
 
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
 
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]