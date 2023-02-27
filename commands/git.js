const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');


const exampleEmbed = new EmbedBuilder()
	.setColor('Random')
	.setTitle('Comandos Git')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
        { name: '\u200B', value: '\u200B' },
		{ name: 'git init', value: 'Inicializa o git no diretório', inline: true  },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.setTimestamp()
	.setFooter({ text: 'Copo-Bot! 2k23', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

module.exports = {
    data: new SlashCommandBuilder()
        .setName("git")
        .setDescription("Git Commands"),

    async execute(interaction) {
        await interaction.reply({ embeds: [exampleEmbed] })
    }
}