let initialized = false;

if (io) {
	const socket = io();
	window.socket = socket;
	socket.on("initialize", data => {
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
	socket.on("stateChange", newStates => {
		console.log("newStates", newStates);
		Object.keys(newStates).forEach(newStateKey => {
			const targetElement = document.querySelector(
				`[key=${newStateKey}]`
			);
			if (targetElement) targetElement.innerText = newStates[newStateKey];
			else
				console.log(
					`Error when changing state of '${newStateKey}'. The requested element couldn't be found.`
				);
		});
	});
} else {
	document.body.innerHTML = `<center><h1>Error. Webserver is probably down at the moment. Please try again later.</h1></center>`;
}
