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

    prediction = model.predict(np.expand_dims(img, axis=0))
    predicted_class = class_labels[np.argmax(prediction)]
    if predicted_class in ["plastic", "cardboard", "paper"]:
        return "recyclable"
    if predicted_class == "glass":
        return "glass"
    if predicted_class == "trash":
        return "trash"
    return "error"


def main():
    if len(sys.argv) != 2:
        print("No such image found on the arguments list")
        return -1

    model = load_model(os.path.dirname(
        os.path.abspath(__file__)) + "/alex.keras",
        compile=False
    )
    print(get_class(sys.argv[1], model))
    return 0


if __name__ == "__main__":
    sys.exit(main())
