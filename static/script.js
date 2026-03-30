document.addEventListener("DOMContentLoaded", () => {

    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = false;
    let currentPlayer = "X";
    let mode = "";

    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const boardDiv = document.getElementById("board");
    const restartBtn = document.getElementById("restartBtn");
    const modeBtn = document.getElementById("modeBtn");

    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });

    // 🎮 Start Game
    window.startGame = function(selectedMode) {
        mode = selectedMode;

        boardDiv.classList.remove("hidden");
        restartBtn.classList.remove("hidden");
        modeBtn.classList.remove("hidden");

        document.getElementById("mode-select").classList.add("hidden");

        resetGame();
    }

    // 🖱️ Handle Click
    function handleClick(e) {
        const index = e.target.dataset.index;

        if (board[index] !== "" || !gameActive) return;

        board[index] = currentPlayer;
        e.target.innerText = currentPlayer;
        // Add color classes
        e.target.classList.add(currentPlayer === "X" ? "x-mark" : "o-mark");

        if (mode === "pvp") {
            if (checkGameEnd()) return;

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateStatus();
        } else if (mode === "ai") {
            if (checkGameEnd()) return;

            currentPlayer = "O";
            updateStatus();

            setTimeout(sendToAI, 400); // makes AI feel real
        }
    }

    // 🤖 AI Move
    function sendToAI() {
        if (!gameActive) return; // Prevent AI from moving if game ended during delay

        fetch("/move", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ board: board })
        })
        .then(res => res.json())
        .then(data => {
            const aiIndex = data.move;

            board[aiIndex] = "O";
            cells[aiIndex].innerText = "O";
            cells[aiIndex].classList.add("o-mark"); // Add the neon blue style for AI

            if (checkGameEnd()) return;

            currentPlayer = "X";
            updateStatus();
        });
    }

    // 🧠 Check Game End
    function checkGameEnd() {
        const winCombos = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[6,4,2]
        ];

        for (let combo of winCombos) {
            const [a,b,c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                status.innerText = `Player ${board[a]} Wins! 🏆`;
                status.style.color = board[a] === "X" ? "#ff0055" : "#00d2ff";
                gameActive = false;
                return true;
            }
        }

        if (!board.includes("")) {
            status.innerText = "It's a Draw! 🤝";
            status.style.color = "#a0a0b8";
            gameActive = false;
            return true;
        }

        return false;
    }

    // 🔄 Update Turn Text
    function updateStatus() {
        if (mode === "pvp") {
            status.innerText = `Player ${currentPlayer === "X" ? "1 (X)" : "2 (O)"} Turn`;
            status.style.color = currentPlayer === "X" ? "#ff0055" : "#00d2ff";
        } else if (mode === "ai") {
            status.innerText = currentPlayer === "X" ? "Your Turn" : "AI is thinking...";
            status.style.color = currentPlayer === "X" ? "#ff0055" : "#00d2ff";
        }
    }

    // 🔁 Restart Game
    window.resetGame = function () {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";

        cells.forEach(cell => {
            cell.innerText = "";
            cell.classList.remove("x-mark", "o-mark"); // Clear colors
        });
        updateStatus();
    }

    // 🔄 Change Mode (BACK TO MENU)
    window.changeMode = function () {
        resetGame(); // Clears the board variables and classes
        gameActive = false;
        mode = "";

        boardDiv.classList.add("hidden");
        restartBtn.classList.add("hidden");
        modeBtn.classList.add("hidden");

        document.getElementById("mode-select").classList.remove("hidden");
        status.innerText = "";
    }
});