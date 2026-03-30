# Tic Tac Toe With Minimax AI

## Overview
This project is a browser-based Tic Tac Toe game built with Flask, vanilla JavaScript, and a Python minimax AI. It supports two modes:
- Player vs Player
- Player vs AI

The player always uses `X`, and the AI uses `O`.

## Tech Stack
- Python
- Flask
- Vanilla JavaScript
- HTML and CSS
- Python recursion for minimax search
- Google Fonts

## Tools And Game Logic Used
- Client-side board state management using a JavaScript array
- Flask API endpoint for AI move generation
- Recursive minimax algorithm for perfect-play decision making
- Winner and draw evaluation on both backend and frontend
- Animated UI with glassmorphism styling and mark-specific effects

## Core Logic
### 1. Game mode selection
The interface starts with a mode menu. The player chooses either PvP or AI mode.

### 2. Frontend board handling
The browser keeps the board state in a 9-element array. Each cell click:
- validates the move
- writes the current player's symbol to the board
- updates the UI with `X` or `O`
- checks for win or draw conditions

### 3. Player vs Player mode
In PvP mode, all turns and game-end checks happen in the browser. The current player alternates between `X` and `O`.

### 4. Player vs AI mode
In AI mode:
- the human places `X`
- the frontend sends the board to `/move`
- the backend calculates the best `O` move
- the frontend renders the returned move and rechecks game state

### 5. Minimax algorithm
`TicTacToeAI.py` implements minimax by exploring every possible future board state:
- `O` is the maximizing player
- `X` is the minimizing player
- AI win returns `1`
- player win returns `-1`
- draw returns `0`

The AI tests each legal move, scores it through minimax, and picks the move with the highest score. This makes the AI effectively unbeatable when the logic is followed completely.

### 6. Board representation
The frontend sends the board as a list of 9 strings. The backend converts it to a dictionary with positions `1` through `9` for easier winner-check logic.

## Project Structure
```text
TICTACTOE/
  README.md
  app.py
  TicTacToeAI.py
  static/
    script.js
    style.css
  templates/
    index.html
```

## Important Files
- `app.py`: Flask app and `/move` API route
- `TicTacToeAI.py`: winner detection, draw detection, minimax search, and AI move selection
- `static/script.js`: mode switching, board updates, API call to the backend, and status text
- `static/style.css`: neon UI styling, animations, and board presentation
- `templates/index.html`: game layout and controls

## How To Run
```bash
cd "TICTACTOE"
pip install flask
python app.py
```

Then open `http://127.0.0.1:5000`.

## Current Behavior Notes
- PvP mode runs entirely on the frontend.
- AI mode depends on the Flask backend because the minimax algorithm lives in Python.
- The backend also exposes `evaluate_game()`, although the frontend currently performs its own visible win/draw checks after rendering each move.
- The UI includes restart and mode-switch controls for replayability.

## Summary
This project combines a polished frontend with a classic game AI approach. It is a strong example of integrating Flask routes, client-side interaction logic, and a recursive minimax algorithm to build an interactive strategy game.
