import sys
import os
import numpy as np
import cv2
from tensorflow.keras.models import load_model
import requests

class_labels = ['glass', 'organic', 'recyclable']

def remove_background_api(img_path: str) -> np.ndarray:
    api_key = "fvEsvAt3z1GBTCQja1gbzig8"  # Replace with your actual API key
    endpoint = "https://api.remove.bg/v1.0/removebg"
    with open(img_path, 'rb') as img_file:
        response = requests.post(
            endpoint,
            files={'image_file': img_file},
            data={'size': 'auto'},
            headers={'X-Api-Key': api_key}
        )
    
    if response.status_code == requests.codes.ok:
        img_data = np.frombuffer(response.content, np.uint8)
        img = cv2.imdecode(img_data, cv2.IMREAD_UNCHANGED)
        return img
    else:
        response.raise_for_status()

def get_class(img_path: str, model) -> str:
    img = remove_background_api(img_path)
    if img.shape[2] == 4:
        img = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)
    img = cv2.resize(img, (256, 256))

    prediction = model.predict(np.expand_dims(img, axis=0), verbose=0)
    predicted_class = class_labels[np.argmax(prediction)]
    return predicted_class


def check_image(img_path: str, model, clean=False):
    result = get_class(img_path, model)

    if clean:
        return print(result)
    print(f"{img_path}: {result}")


def process_folder(folder_path: str, model):
    for root, _, files in os.walk(folder_path):
        for file in files:
            if not file.lower().endswith(('.png', '.jpg', '.jpeg')):
                continue
            check_image(os.path.join(root, file), model)


def main():
    if len(sys.argv) != 2:
        print("Usage: python predict.py <image_path_or_folder>")
        return -1

    path = sys.argv[1]
    model = load_model(os.path.dirname(
        os.path.abspath(__file__)) + "/model.keras",
        compile=False
    )

    if os.path.isfile(path):
        check_image(path, model, True)
    elif os.path.isdir(path):
        process_folder(path, model)
    else:
        print(f"Invalid path: {path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
