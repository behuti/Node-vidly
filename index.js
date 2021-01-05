const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
	{
		id: 1,
		name: "Drama",
	},
	{
		id: 2,
		name: "Action",
	},
	{
		id: 3,
		name: "Zombies",
	},
];

app.get("/", (req, res) => {
	res.send("Vidly.js");
});

// Event Handlers
app.get("/api/genres", (req, res) => {
	res.send(genres);
});


app.listen(3000, () => {
	console.log(`Listening on port ${3000}...`);
});
