const boardCode = document.getElementById("board_code").getAttribute("board_code");

const connectionString = 'ws://' + window.location.host + '/ws/boards/' + boardCode + '/';
const socketConn = new WebSocket(connectionString);


socketConn.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};

socketConn.onmessage = function (e) {
    let data = JSON.parse(e.data);
    console.log(data);
};

function ping() {
    socketConn.send(JSON.stringify({"message": "ping"}));
}
