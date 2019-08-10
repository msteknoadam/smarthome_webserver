declare global {
	interface Window {
		socket: SocketIOClient.Socket;
	}
}

import * as io from "socket.io-client";

let initialized = false;
const socket = io();
window.socket = socket;
socket.on("initialize", (data: { [s: string]: string }) => {
	if (!initialized) {
		initialized = true;
		console.log("initialize", data);
		Object.keys(data).forEach(dataKey => {
			const centerEl = document.createElement("center");
			centerEl.innerHTML = `
			<p>
				<span class="dataKey">${dataKey}:</span>
				<span class="data" key="${dataKey}">${data[dataKey]}</span>
				<span class="divider">||||</span>
				<button onClick="socket.emit('setState', { '${dataKey}': 'on' })">Turn On</button>
				<button onClick="socket.emit('setState', { '${dataKey}': 'off' })">Turn Off</button>
			</p>`;
			document.body.append(centerEl);
		});
	} else {
		console.log(
			`The page has already initialized but there has been
				another initialize command,	so refreshing the page.`
		);
		location.reload();
	}
});
socket.on("stateChange", (newStates: { [s: string]: string }) => {
	console.log("newStates", newStates);
	Object.keys(newStates).forEach(newStateKey => {
		const targetElement = document.querySelector(`[key=${newStateKey}]`);
		if (targetElement) targetElement.innerHTML = newStates[newStateKey];
		else
			console.log(
				`Error when changing state of '${newStateKey}'. The requested element couldn't be found.`
			);
	});
});
