const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

/**
 * @typedef {import('discord.js').CommandInteraction} CommandInteraction
 */

module.exports = {
    /**
     * Informations sur la commande slash.
     * @type {SlashCommandBuilder}
     */
    data: new SlashCommandBuilder()
        .setName('update-state')
        .setDescription('Met à jour l\'état d\'un élément dans la watchlist.')
        .addIntegerOption(option =>
            option.setName('user-id')
                .setDescription('ID de l\'utilisateur.')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('watchlist-id')
                .setDescription('ID de la watchlist.')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('film-id')
                .setDescription('ID du film à mettre à jour dans la watchlist.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('etat')
                .setDescription('État de l\'élément dans la watchlist (terminé, à voir, à commencé, abandonné).')
                .setRequired(true)),

    /**
     * Exécute la commande slash pour mettre à jour l'état d'un élément dans la watchlist.
     * @param {CommandInteraction} interaction L'interaction de commande.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        try {
            const userId = interaction.options.getInteger('user-id');
            const watchlistId = interaction.options.getInteger('watchlist-id');
            const filmId = interaction.options.getInteger('film-id');
            const etat = interaction.options.getString('etat');

            let response;
            try {
                response = await axios.patch('http://localhost:3000/watchlists/updateState', {
                    utilisateurId: userId,
                    watchlistId: watchlistId,
                    itemId: filmId,
                    etat: etat
                });
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    await interaction.reply(error.response.data.error);
                } else {
                    await interaction.reply('Une erreur s\'est produite lors de la mise à jour de l\'état de l\'élément dans la watchlist.');
                }
                return;
            }

            // Si la requête est réussie, envoyer une réponse dans le chat Discord
            await interaction.reply('État de l\'élément mis à jour avec succès!');
        } catch (error) {
            await interaction.reply('Une erreur s\'est produite lors de la mise à jour de l\'état de l\'élément dans la watchlist.');
        }
    },
};
