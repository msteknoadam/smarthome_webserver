import * as express from "express";
import * as socketio from "socket.io";
import * as http from "http";

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
	res.send(`<h1>Hello World!</h1>`);
});

server.listen(3000, () => {
	console.log(`Listening on *:${3000}`);
});
