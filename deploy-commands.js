const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TOKEN;
const clientID = process.env.clientID;
const guildID = process.env.guildID;


const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//iterate thru files
//push json data of each command to commands array
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

//run node deploy-commands.js when editing/adding new commands

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientID, guildID),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();