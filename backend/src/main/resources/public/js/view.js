'use strict';

const webSocket = new WebSocket("ws://" + location.hostname + ":" + location.port + "/chatapp");
//wss foe heorku
/**
 * Entry point into chat room
 */
window.onload = function() {

    webSocket.onclose =   ()    => alert("WebSocket connection closed");
    webSocket.onmessage = (msg) => updateChatRoom(msg);
    $("#btn-msg").click(()      => sendMessage($("#message").val()));

};

/**
 * Send a message to the server.
 * @param msg  The message to send to the server.
 */
function sendMessage(msg) {
    if (msg !== "") {
        webSocket.send(msg);
        $("#message").val("");
        $("#chatArea").append("<p>You say: " + msg + "</p>");
    }
}

/**
 * Update the chat room with a message.
 * @param message  The message to update the chat room with.
 */
function updateChatRoom(message) {
    let data = JSON.parse(message.data);
    $("#chatArea").append(data.userMessage);
}
