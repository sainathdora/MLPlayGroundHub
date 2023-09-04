from flask import Flask, request, jsonify
import joblib
import numpy as np
m = joblib.load('LR.joblib')

app = Flask(__name__)


@app.route('/')
def hello_world():

    return 'Hello, World!'


@app.route('/api/person', methods=['POST'])
def create_person():
    # Get the data from the request's JSON body
    data = request.json

    # Ensure 'name' and 'age' fields are present in the JSON data
    if 'name' not in data or 'age' not in data:
        return jsonify({'error': 'Both name and age are required'}), 400

    # Extract 'name' and 'age' from the JSON data
    name = data['name']
    age = data['age']

    # Create a response JSON object
    response = {
        'name': name,
        'age': age,
        'message': 'Person created successfully'
    }

    # 201 status code indicates resource creation
    return jsonify(response), 201


@app.route('/api/MLmodel/LR', methods=['POST'])
def display_prediction():
    # Get the data
    data = request.json
    print('This is data: ', data)
    predicted = m.predict(np.array([1]).reshape(1, 1))[0]
    response = {
        "Predicted_val": predicted
    }
    return jsonify(response), 201


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
