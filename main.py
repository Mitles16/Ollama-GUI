from flask import Flask, request, jsonify
import requests
import json

app = Flask(__name__)


def Prompting(prompt):
    output = ''

    result = requests.post(
        'http://localhost:11434/api/generate',
        json={"model": "llama3:8b", "prompt": prompt},
        stream=True
    )

    for line in result.iter_lines():
        try:
            data = json.loads(line.decode("utf-8"))
            output += (data['response'])
        except:
            pass

    return output # Final Result

@app.route("/api/prompt", methods=["POST"])
def api_prompt():
    user_data = request.json
    prompt = user_data.get('prompt', '')

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    response_text = Prompting(prompt)
    return jsonify({"response": response_text})


if __name__ == "__main__":
    app.run(port=5000, debug=True)