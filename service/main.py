from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
# from pydantic import BaseModel
from yolo5face.get_model import get_model
from deepface import DeepFace
import cv2
import base64
import numpy as np
from fastapi.responses import ORJSONResponse
model = get_model("yolov5n", device=0, min_face=24)
app = FastAPI()

origins = [
    "http://localhost:3001",# FastAPI address
    "http://127.0.0.1:3001",
    "http://localhost:3001/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# class Body(BaseModel):
#     photo: str
#     webcam: str 
        
@app.post("/check")
async def check(request: Request):
    # print(body)
    body = await request.json()
    # print(body)
    base64_data = body['webcam'].split(",")[-1]  # Remove the base64 image format prefix if exists
    contents1 = base64.b64decode(base64_data)
    contents = cv2.imdecode(np.frombuffer(contents1, np.uint8), cv2.IMREAD_COLOR)
    contents = cv2.cvtColor(contents, cv2.COLOR_BGR2RGB)
    enhanced_boxes, enhanced_key_points, enhanced_scores = model(contents, target_size=[320, 640, 1280])
    nop = len(enhanced_boxes)
    
    # pass1 = file2.file.read()
    photo=body['photo'].split(",")[-1]
    photo=base64.b64decode(photo)
    pass2 = cv2.imdecode(np.frombuffer(photo, np.uint8), cv2.IMREAD_COLOR)
    veri=DeepFace.verify(contents, pass2,detector_backend="opencv",model_name="Facenet512",enforce_detection=False,align=True,distance_metric="euclidean_l2")
    # print(veri)
    return ORJSONResponse({"no_of_person": nop, "verified": veri['verified']})



@app.get("/test")
def test():
    return {"message": "Hello World"}
