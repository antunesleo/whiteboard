from django.shortcuts import render, redirect


def index(request):
    if request.method == "POST":
        board_code = request.POST.get("board_code")
        return redirect(f"/boards/{board_code}")
    return render(request, "index.html", {})


def board(request, board_code):
    context = {"board_code": board_code}
    return render(request, "board.html", context)
