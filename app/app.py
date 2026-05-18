from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return "Application de prediction du rendement du maïs en cours de preparation."


if __name__ == "__main__":
    app.run(debug=True)
