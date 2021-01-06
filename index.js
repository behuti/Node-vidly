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

// Validate functions
function validateGenre(genre) {
	const schema = Joi.object({
		name: Joi.string().min(3).required()
	});

	return schema.validate(genre);
}

// Event Handlers

// Fetch all Genres
app.get("/api/genres", (req, res) => {
	res.send(genres);
});

// Fetch Genre by id
app.get("/api/genres/:id", (req, res) => {
	const genre = genres.find((g) => g.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send("The genre with the given id does not exists.");
	res.send(genre);
});

app.post("/api/genres", (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = {
		id: genres.length + 1,
		name: req.body.name,
	};

	genres.push(genre);
	res.send(genre);
});

app.listen(3000, () => {
	console.log(`Listening on port ${3000}...`);
});
