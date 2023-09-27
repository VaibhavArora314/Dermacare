import os
import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define list of class names
class_names = ['Psoriasis pictures Lichen Planus and related diseases','vitiligo','Acne and Rosacea Photos','Normal','Tinea Ringworm Candidiasis and other Fungal Infections','Eczema Photos']

# Load saved model
model = tf.keras.models.load_model('model/skin_model_74acc.h5')
vgg_model = tf.keras.applications.VGG19(weights = 'imagenet',  include_top = False, input_shape = (180, 180, 3)) 

# Function to preprocess image
# def preprocess_image(image_path):
#     img = cv2.imread(image_path)
#     img = cv2.resize(img, (180, 180))
#     img = np.array(img) / 255.0
#     img = np.expand_dims(img, axis=0)
#     img = vgg_model.predict(img)
#     img = img.reshape(1, -1)  # Flatten the image to (1, 12800)
#     return img

def predict(image_path):
    test_image=[]

    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (180, 180))
    test_image.append(img)
    img = np.array(test_image)
    print(img.shape)

    # img = np.expand_dims(img, axis=0)
    features_test1 = vgg_model.predict(img)
    num_test=img.shape[0]
    img = features_test1.reshape(num_test, -1)

    # Make prediction on preprocessed image
    # print(img.shape)
    pred = model.predict(img)
    pred2 = np.argmax(pred, axis=1)
    print(pred2)
    # predicted_class_index = np.argmax(pred)
    predicted_class_name = class_names[pred2[0]]

    return predicted_class_name

@app.route('/predict', methods=['POST'])
def predictEndpoint():
    try:
        # Get the image file from the request
        print(request.files)
        file = request.files['image']

        # Save the image to a temporary file
        temp_image_path = "temp_image.jpg"
        file.save(temp_image_path)

        # Preprocess the image
        # img = preprocess_image(temp_image_path)

        # # Make prediction on preprocessed image
        # pred = model.predict(img)[0]
        # predicted_class_index = np.argmax(pred)
        # predicted_class_name = class_names[predicted_class_index-1]
        # print(pred,predicted_class_index,predicted_class_name)

        predicted_class_name = predict(temp_image_path)

        # Delete the temporary image file
        os.remove(temp_image_path)

        result = {"prediction": predicted_class_name}
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=7000)