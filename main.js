// fs is node's native file system
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
// const { token } = require('./config.json');
// const myIntents = new Intents();
// myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

// const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TOKEN;
const clientID = process.env.clientID;
const guildID = process.env.guildID;


// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//create collection of client commands
client.commands = new Collection();

//returns array of all file names in directory
//filters all non .js files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

//client creates interaction
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

    //fetch command in collection with interaction name, assign it to variable command
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

    //execute command, parse interaction variable
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);


// // discord.js import
// const Discord = require('discord.js');
// // node-fetch for making HTTP requests
// const fetch = require('node-fetch');

// // initialize client
// const client = new Discord.Client();
// // my model URL
// API_URL = 'https://api-inference.huggingface.co/models/r3dhummingbird/DialoGPT-medium-joshua';

// // log out some info
// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);
// });

// // when the bot receives a message
// // need async message because we are making HTTP requests
// client.on('message', async message => {
//     // ignore messages from the bot itself
//     if (message.author.bot) {
//         return;
//     }
//     // form the payload
//     const payload = {
//         inputs: {
//             text: message.content
//         }
//     };
//     // form the request headers with Hugging Face API key
//     const headers = {
//         'Authorization': 'Bearer ' + process.env.HUGGINGFACE_TOKEN
//     };

//     // set status to typing
//     message.channel.startTyping();
//     // query the server
//     const response = await fetch(API_URL, {
//         method: 'post',
//         body: JSON.stringify(payload),
//         headers: headers
//     });
//     const data = await response.json();
//     let botResponse = '';
//     if (data.hasOwnProperty('generated_text')) {
//         botResponse = data.generated_text;
//     } else if (data.hasOwnProperty('error')) { // error condition
//         botResponse = data.error;
//     }
//     // stop typing
//     message.channel.stopTyping();
//     // send message to channel as a reply
//     message.reply(botResponse);
// })

// client.login(process.env.DISCORD_TOKEN);