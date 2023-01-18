const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
const puppeteer = require("../puppeteer");
// var arrRunes;

const data = new SlashCommandBuilder()
	.setName('runes')
	.setDescription('Replies with your runes!')
	.addStringOption(option =>
		option.setName('champ')
			.setDescription('Enter a champion:')
			.setRequired(true))
	.addStringOption(option =>
		option.setName('role')
			.setDescription('Enter your role:')
			.setRequired(true));


async function execute(interaction) {
	await interaction.deferReply();
	//get arrrunes using await
	const arrRunes = await puppeteer.grabData(interaction.options.getString('champ'), interaction.options.getString('role'));
	
	//get arrrunes using .then()
	// await puppeteer.grabData(interaction.options.getString('champ'), interaction.options.getString('role')).then(arr=>{
	// 	arrRunes = arr;	
	// });
	
	await interaction.editReply(arrRunes[0]);
	// await interaction.followUp(arrRunes[1]);
	// await interaction.followUp(arrRunes[2]);
	// await interaction.followUp(arrRunes[3]);
	for(var i = 1; i < arrRunes.length; i++)
	{
		await interaction.followUp(arrRunes[i]);
	}
	
}

module.exports = {
	data,
	execute
};

        
       