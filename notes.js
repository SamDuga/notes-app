const chalk = require('chalk');
const fs = require('node:fs');

const addNote = (title, body) => {
	const notes = loadNotes();

	const containsTitle = notes.findIndex((x) => x.title === title);

	if (containsTitle < 0) {
		notes.push({
			title: title,
			body: body,
		});

		console.log(chalk.bgGreen(`Saved note "${title}" sucessfully!`));

		saveNotes(notes);
	} else {
		console.log(chalk.bgRed(`Note title: "${title}" already in use!`));
	}
};

const saveNotes = (notes) => {
	const dataString = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataString);
};

const loadNotes = () => {
	try {
		const buffer = fs.readFileSync('notes.json');
		const dataString = buffer.toString();
		return JSON.parse(dataString);
	} catch (err) {
		return [];
	}
};

const removeNote = (title) => {
	const notes = loadNotes();

	const index = notes.findIndex((x) => x.title === title);

	if (index > -1) {
		console.log(chalk.bgGreen(`Removing note with title: "${title}"!`));
		notes.splice(index, 1);
	} else {
		console.log(
			chalk.bgRed(`No note with title: "${title}" present to remove!`),
		);
	}

	saveNotes(notes);
};

const listNotes = () => {
	const notes = loadNotes();

	console.log(chalk.green('Your notes...'));

	notes.forEach((note) => {
		console.log(note);
	});
};

const readNote = (title) => {
	const notes = loadNotes();

	const existingNote = notes.find((x) => x.title === title);

	if (existingNote) {
		console.log(chalk.bgGreen(title));
		console.log(existingNote.body);
	} else console.log(chalk.bgRed(`No note for title: "${title}" found!`));
};

module.exports = {
	addNote,
	removeNote,
	listNotes,
	readNote,
};
