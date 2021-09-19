const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('runes')
	.setDescription('Replies with your runes!')
	.addStringOption(option =>
		option.setName('champ')
			.setDescription('Enter a champion:')
			.setRequired(true));

module.exports = {
	data,
    
	async execute(interaction) {
		await interaction.reply(interaction.options.getString('champ'));
	},
};

        
       