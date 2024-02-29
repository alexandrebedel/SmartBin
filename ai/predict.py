import sys
import os
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model

class_labels = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']

def get_class(img_path: str, model) -> str:
    img = image.load_img(img_path, target_size=(512, 384))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalisation des pixels
    
    # Prédiction de la classe
    prediction = model.predict(img_array, verbose=0)
    return class_labels[np.argmax(prediction)]

def main():
    if (len(sys.argv) != 2):
        print("No such image found on the arguments list")
        return -1

    model = load_model(os.path.dirname(os.path.abspath(__file__)) + '/trash_detection_model.keras')
    print(get_class(sys.argv[1], model))
    return 0

if __name__ == '__main__':
    sys.exit(main())