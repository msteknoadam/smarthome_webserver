import * as io from "socket.io-client";

/* Python sux */

const socket = io("http://localhost:3000");

socket.on("connection", () => {
	console.log("Successfully connected to the server");
});

socket.on("disconnect", () => {
	console.log("Disconnected from the server");
});

socket.on("initialize", (data: object) => {
	console.log("initialize", data);
});

socket.on("stateChange", (newStates: object) => {
	console.log("newStates", newStates);
	Object.keys(newStates).forEach(newStateKey => {
		console.log(
			`Changed state of '${newStateKey}' to '${newStates[newStateKey]}'`
		);
	});
});
