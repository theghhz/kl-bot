const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("docs")
        .setDescription("Documentações"),

    async execute(interaction) {
        await interaction.reply("``Pong!!``")
    }
}