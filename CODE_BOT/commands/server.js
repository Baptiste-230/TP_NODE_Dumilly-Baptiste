const { SlashCommandBuilder } = require('@discordjs/builders');

/**
 * @typedef {import('discord.js').CommandInteraction} CommandInteraction
 */

module.exports = {
    /**
     * Informations sur la commande slash.
     * @type {SlashCommandBuilder}
     */
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Renvoie des infos sur le serveur'),

    /**
     * Exécute la commande slash pour renvoyer des informations sur le serveur.
     * @param {CommandInteraction} interaction L'interaction de commande.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        await interaction.reply(`Nom du serveur: ${interaction.guild.name}\nNombre de membres: ${interaction.guild.memberCount}`);
    },
};
