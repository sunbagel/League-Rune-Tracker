const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pooga')
		.setDescription('Replies with Pooga!'),
	async execute(interaction) {
		await interaction.reply('Pooga!');
	},
};