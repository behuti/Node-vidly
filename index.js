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
		name: Joi.string().min(3).required(),
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

// Post new Genre
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

app.put("/api/genres/:id", (req, res) => {
	// Look for the id of the genre
	const genre = genres.find((g) => g.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send("The genre with the given id does not exists.");

	// Validate the body of the request
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Modify the genre
	console.log(genre.name);
	genre.name = req.body.name;

	res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
	// Find the Genre by id
	const genre = genres.find( (g) => g.id === parseInt(req.params.id) );
	if (!genre) return res.status(404).send("The Genre with the given id does not exists.");

	// Delete Genre
	const index = genres.indexOf(genre);
	genres.splice(index, 1);

	//Return 
	res.send(genre);
})

app.listen(3000, () => {
	console.log(`Listening on port ${3000}...`);
});
