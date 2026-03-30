from flask import Flask, render_template, request, jsonify
from TicTacToeAI import get_ai_move, evaluate_game

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/move", methods=["POST"])
def move():
    data = request.json
    board = data["board"]

    ai_move = get_ai_move(board)
    board[ai_move] = "O"

    result = evaluate_game(board)

    return jsonify({
        "move": ai_move,
        "result": result
    })

if __name__ == "__main__":
    app.run(debug=True)