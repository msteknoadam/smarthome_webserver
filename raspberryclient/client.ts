import * as io from "socket.io-client";

/* Python sux */

let socket: SocketIOClient.Socket;

const connectToSocket = () => {
	if (socket) socket.close();
	socket = undefined;
	console.log("Attempting to connect to websocket.");
	socket = io("http://localhost:3000");
	socket.on("connect", () => {
		console.log(
			`Successfully connected to the server with id '${socket.id}'`
		);
	});

	socket.on("disconnect", () => {
		console.log("Disconnected from the server, trying to reconnect.");
		socket.close();
		connectToSocket();
	});

	socket.on("initialize", (data: object) => {
		console.log("initialize", data);
	});

	socket.on("stateChange", (newStates: object) => {
		console.log("newStates", newStates);
		Object.keys(newStates).forEach(newStateKey => {
			console.log(
				`Changed state of '${newStateKey}' to '${
					newStates[newStateKey]
				}'`
			);
		});
	});
};

connectToSocket();
