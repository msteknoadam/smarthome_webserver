import * as express from "express";
import * as socketio from "socket.io";
import * as http from "http";
import * as path from "path";
import * as fs from "fs";

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let currentStates = {
	lights: "on",
	climax: "off"
};

const setState = (key: string, newState: string) => {
	if (currentStates[key]) {
		let response = {};
		currentStates[key] = newState;
		response[key] = newState;
		io.emit("stateChange", response);
		console.log(`Changed state of '${key}' to '${newState}'`);
	}
};

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "client", "/index.html"));
});

app.get("*", (req, res) => {
	fs.exists(path.join(__dirname, "..", "client", req.path), exists => {
		if (exists)
			res.sendFile(path.join(__dirname, "..", "client", req.path));
		else
			res.status(404).send(
				`<center>
                    <h1>
                        Error 404
                        <br/>
                        Requested path '${req.path}' is not found on the server.
                    </h1>
                </center>`
			);
	});
});

io.on("connection", socket => {
	console.log(`New connection: ${socket.id}`);
	socket.emit("initialize", currentStates);
	socket.on("setState", newStates => {
		try {
			Object.keys(newStates).forEach(newStateKey => {
				if (currentStates[newStateKey])
					setState(newStateKey, newStates[newStateKey]);
			});
		} catch (error) {
			console.error(
				"There has been an error with socket setState event:",
				error
			);
		}
	});
	socket.on("disconnect", () => {
		console.log(`Dropped connection: ${socket.id}`);
	});
});

server.listen(3000, () => {
	console.log(`Listening on *:${3000}`);
});
