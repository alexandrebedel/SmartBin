import sys
import os
import numpy as np
import cv2
# from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model

class_labels = ["cardboard", "glass", "metal", "paper", "plastic", "trash"]


def get_class(img_path: str, model) -> str:
    img = cv2.imread(img_path)
    img = cv2.resize(img, (256, 256))

    prediction = model.predict(np.expand_dims(img, axis=0), verbose=0)
    predicted_class = class_labels[np.argmax(prediction)]
    # print(f"Predicted class: {predicted_class}")
    if predicted_class in ["plastic", "cardboard", "paper"]:
        return "recyclable"
    if predicted_class == "glass":
        return "glass"
    if predicted_class == "trash":
        return "trash"
    return "error"


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
        os.path.abspath(__file__)) + "/model-resized-20.keras",
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
