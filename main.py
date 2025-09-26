from flask import Flask, request, jsonify
import requests

#app = Flask(__name__)

def Prompting(prompt):


    result = requests.post(
        'http://localhost:11434/api/generate',
        json={"model": "llama3:8b", "prompt": prompt},
        stream=True
    )

    for line in result.iter_lines():
        print(line)




Prompting('What are you up to?')