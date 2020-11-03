import CreateRoom from "../room/createRoom";

const webSocket = new WebSocket("ws://localhost:4567/chatapp")
export default webSocket;
// const webSocket = new WebSocket("wss://chatapp-team-sammytheowl.herokuapp.com/chatapp")
// webSocket.onmessage = message => {
//     let request = JSON.parse(message.data);
//     switch (request.request) {
//         case "createRoom":
//             //CreateRoom.handleCreateRoom(request);
//             break;
//         default:
//             break;
//     }
// }


