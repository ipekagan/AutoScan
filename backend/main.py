from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from tensorflow.keras.applications.efficientnet import preprocess_input
from PIL import Image
import io

app = FastAPI()

# CORS — Next.js'in erişebilmesi için
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sınıf isimleri — klasör sırası 1-8
CLASS_NAMES = {
    0: "SUV",
    1: "VAN",
    2: "STATION WAGON",
    3: "MICRO",
    4: "AÇIK TEKERLEKLİ",
    5: "SEDAN",
    6: "HATCHBACK",
    7: "PICK UP"
}

# Model yükleme
MODEL_PATH = "autoscan_model.keras"
model = tf.keras.models.load_model(MODEL_PATH)
print(f"Model yüklendi: {MODEL_PATH}")


def prepare_image(image_bytes: bytes) -> np.ndarray:
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img, dtype=np.float32)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    img_array = prepare_image(image_bytes)

    predictions = model.predict(img_array)[0]

    pred_index = int(np.argmax(predictions))
    pred_class = CLASS_NAMES[pred_index]
    confidence = float(predictions[pred_index])

    # Tüm sınıflar için olasılıklar
    all_probs = {
        CLASS_NAMES[i]: float(predictions[i])
        for i in range(len(CLASS_NAMES))
    }

    return {
        "class": pred_class,
        "class_id": pred_index + 1,  # 1-8 arası
        "confidence": confidence,
        "probabilities": all_probs
    }


@app.get("/health")
def health():
    return {"status": "ok"}