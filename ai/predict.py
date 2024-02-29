import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model

model = load_model('trash_detection_model.keras')
class_labels = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']

img_path = "./test-images/metal-can.jpeg"

def get_class(img_path: str) -> str:
    img = image.load_img(img_path, target_size=(512, 384))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalisation des pixels
    
    # Prédiction de la classe
    prediction = model.predict(img_array, verbose=0)
    return class_labels[np.argmax(prediction)]

def main():
    print(get_class(img_path))

if __name__ == '__main__':
    main()