const { SlashCommandBuilder } = require('discord.js');

/**
 * @typedef {import('discord.js').CommandInteraction} CommandInteraction
 */

module.exports = {
    /**
     * Informations sur la commande slash.
     * @type {SlashCommandBuilder}
     */
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Répète un message')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Le message à répéter')
                .setRequired(true)),

    /**
     * Exécute la commande slash pour répéter un message.
     * @param {CommandInteraction} interaction L'interaction de commande.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        const message = interaction.options.getString('message');
        await interaction.reply(message);
    },
};
