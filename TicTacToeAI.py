def list_to_dict(board_list):
    return {i+1: (board_list[i] if board_list[i] != "" else ' ') for i in range(9)}

def check_winner(board, mark):
    combos = [
        [1,2,3],[4,5,6],[7,8,9],
        [1,4,7],[2,5,8],[3,6,9],
        [1,5,9],[7,5,3]
    ]
    for combo in combos:
        if all(board[pos] == mark for pos in combo):
            return True
    return False

def is_draw(board):
    return all(board[key] != ' ' for key in board)

def minimax(board, maximizing):
    if check_winner(board, 'O'):
        return 1
    if check_winner(board, 'X'):
        return -1
    if is_draw(board):
        return 0

    if maximizing:
        best = -1000
        for key in board:
            if board[key] == ' ':
                board[key] = 'O'
                score = minimax(board, False)
                board[key] = ' '
                best = max(best, score)
        return best
    else:
        best = 1000
        for key in board:
            if board[key] == ' ':
                board[key] = 'X'
                score = minimax(board, True)
                board[key] = ' '
                best = min(best, score)
        return best

def get_ai_move(board_list):
    board = list_to_dict(board_list)

    best_score = -1000
    best_move = None

    for key in board:
        if board[key] == ' ':
            board[key] = 'O'
            score = minimax(board, False)
            board[key] = ' '

            if score > best_score:
                best_score = score
                best_move = key

    return best_move - 1

def evaluate_game(board_list):
    board = list_to_dict(board_list)

    if check_winner(board, "O"):
        return "ai"
    elif check_winner(board, "X"):
        return "player"
    elif is_draw(board):
        return "draw"
    else:
        return "continue"