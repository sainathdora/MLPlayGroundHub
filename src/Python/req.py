# import requests

# url = 'http://localhost:5000/api/person'
# data = {'name': 'John', 'age': 30}
# response = requests.post(url, json=data)

# print(response.status_code)
# print(response.json())


# import requests

# # Define the URL of your Flask API
# url = 'https://sainath86.pythonanywhere.com/api/person'

# # Define the data you want to send as JSON
# data = {'name': 'John', 'age': 30}

# # Send the POST request
# response = requests.post(url, json=data)

# # Print the response
# print(response.status_code)
# print(response.json())


# Linear regression
import requests
url = 'http://localhost:5000/api/MLmodel/LR'
data = {
    'Exp': 2
}
response = requests.post(url, json=data)

print(response.status_code)
print(response.json())
