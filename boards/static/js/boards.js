const boardCanvas = document.getElementById("board_canvas");
boardCanvas.width = window.innerWidth - 20;
boardCanvas.height = window.innerHeight - 20;

let canvasContext = boardCanvas.getContext("2d");
canvasContext.fillStyle="#fff";
canvasContext.fillRect(0,0, boardCanvas.width, boardCanvas.height);

let isDown = false;

if(boardCanvas){
    canvasContext.lineWidth = 5;

    boardCanvas.onmousedown = function(e){
        let message = {
            event: "on-mouse-down",
            position: {
                x: e.pageX - boardCanvas.offsetLeft,
                y: e.pageY - boardCanvas.offsetTop
            }
        }
        socketConn.send(JSON.stringify(message));
    }

    boardCanvas.onmousemove = function(e){
        if(isDown !== false) {
            let message = {
                event: "on-mouse-move",
                position: {
                    x: e.pageX - boardCanvas.offsetLeft,
                    y: e.pageY - boardCanvas.offsetTop
                }
            }
            socketConn.send(JSON.stringify(message));
        }
    }

    boardCanvas.onmouseup = function(e){
        let message = {
            event: "on-mouse-up",
        }
        socketConn.send(JSON.stringify(message));
    }
}

function handleMouseDown(position) {
    isDown = true;
    canvasContext.beginPath();
    canvasContext.moveTo(position.x, position.y);
}

function handleMouseMove(position) {
    canvasContext.lineTo(position.x, position.y);
    canvasContext.strokeStyle = "#000";
    canvasContext.stroke();
}

function handleMouseUp() {
    isDown = false;
    canvasContext.closePath();
}

const boardCode = document.getElementById("board_code").getAttribute("board_code");

const connectionString = 'ws://' + window.location.host + '/ws/boards/' + boardCode + '/';
const socketConn = new WebSocket(connectionString);


socketConn.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};

socketConn.onmessage = function (e) {
    let data = JSON.parse(e.data);

    if (data.event === "on-mouse-down") {
        handleMouseDown(data.position)
    }
    else if (data.event === "on-mouse-move") {
        handleMouseMove(data.position)
    }
    else if (data.event === "on-mouse-up") {
        handleMouseUp()
    }
};
