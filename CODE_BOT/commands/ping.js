const { SlashCommandBuilder } = require('discord.js')

/**
 * @typedef {import('discord.js').CommandInteraction} CommandInteraction
 */

module.exports = {
    /**
     * Informations sur la commande slash.
     * @type {SlashCommandBuilder}
     */
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Réponse : Pong!'),

    /**
     * Exécute la commande slash.
     * @param {CommandInteraction} interaction L'interaction de commande.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        await interaction.reply('Pong!')
        await interaction.followUp('Pong again!')
    },
}
