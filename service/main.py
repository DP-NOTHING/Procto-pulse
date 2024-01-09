from fastapi import FastAPI, File, UploadFile
from typing import Union
from pydantic import BaseModel
from yolo5face.get_model import get_model
import cv2
import numpy as np

model = get_model("yolov5n", device=0, min_face=24)
app = FastAPI()

# class Item(BaseModel):
#     name: str
#     price: float
#     is_offer: Union[bool, None] = None
    
@app.post("/check")
def check(file: UploadFile = File(...)):
    contents1 = file.file.read()
    contents = cv2.imdecode(np.fromstring(contents1, np.uint8), cv2.IMREAD_COLOR)
    enhanced_boxes, enhanced_key_points, enhanced_scores = model(contents, target_size=[320, 640, 1280])
    nop = len(enhanced_boxes)
    return {"no_of_person": nop}


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

# @app.put("/items/{item_id}")
# def update_item(item_id: int, item: Item):
#     return {"item_name": item.price, "item_id": item_id}