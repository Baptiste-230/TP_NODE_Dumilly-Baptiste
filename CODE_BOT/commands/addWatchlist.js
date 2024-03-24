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
        .setName('add-watchlist')
        .setDescription('Ajoute une watchlist à la base de données.')
        .addIntegerOption(option => 
            option.setName('id')
                .setDescription("L'ID de l'utilisateur à ajouter")
                .setRequired(true))
        .addStringOption(option => 
            option.setName('name')
                .setDescription('Le nom de la watchlist')
                .setRequired(true)),

    /**
     * Exécute la commande slash pour ajouter une watchlist à la base de données.
     * @param {CommandInteraction} interaction L'interaction de commande.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        try {
            // Récupérer les données de l'interaction Discord
            const userId = interaction.options.getInteger('id');
            const watchlistName = interaction.options.getString('name');

            // Effectuer une requête POST pour ajouter la watchlist
            const response = await axios.post('http://localhost:3000/watchlists/add', {
                utilisateurId: userId,
                nom: watchlistName
            });

            // Vérifier la réponse de la requête
            if (response.status === 200) {
                // Construction du message de confirmation
                const confirmationMessage = `Watchlist "${watchlistName}" a été ajoutée pour l'utilisateur avec l'ID ${userId}.`;

                // Répondre à l'interaction avec le message de confirmation
                await interaction.reply(confirmationMessage);
            } else {
                // En cas de réponse invalide ou non attendue
                throw new Error("Erreur lors de l'ajout de la watchlist");
            }
        } catch (error) {
            // Extraire le message d'erreur de la réponse Axios
            const errorMessage = error.response.data.error || 'Une erreur s\'est produite lors de l\'ajout de la watchlist.';
            await interaction.reply(errorMessage);
        }
    }
};
