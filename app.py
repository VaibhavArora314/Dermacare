import os
import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify

app = Flask(__name__)

# Define list of class names
class_names = ["Acne", "Eczema", "Atopic", "Psoriasis", "Tinea", "Vitiligo"]

# Load saved model
model = tf.keras.models.load_model('model/skin_model.h5')
vgg_model = tf.keras.applications.VGG19(weights = 'imagenet',  include_top = False, input_shape = (180, 180, 3)) 

# Function to preprocess image
def preprocess_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (180, 180))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    img = vgg_model.predict(img)
    img = img.reshape(1, -1)  # Flatten the image to (1, 12800)
    return img

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the image file from the request
        file = request.files['image']

        # Save the image to a temporary file
        temp_image_path = "temp_image.jpg"
        file.save(temp_image_path)

        # Preprocess the image
        img = preprocess_image(temp_image_path)

        # Make prediction on preprocessed image
        pred = model.predict(img)[0]
        predicted_class_index = np.argmax(pred)
        predicted_class_name = class_names[predicted_class_index]

        # Delete the temporary image file
        os.remove(temp_image_path)

        result = {"prediction": predicted_class_name}
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
