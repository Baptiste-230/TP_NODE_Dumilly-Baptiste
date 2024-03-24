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
        .setName('find-watchlist')
        .setDescription('Affiche les informations des watchlists.')
        .addIntegerOption(option => 
            option.setName('id')
                .setDescription('ID facultative de la watchlist à afficher'))
        .addIntegerOption(option => 
            option.setName('user-id')
                .setDescription('ID facultative de l\'utilisateur pour filtrer les watchlists')),

    /**
     * Exécute la commande slash pour afficher les informations des watchlists.
     * @param {CommandInteraction} interaction L'interaction de commande.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        try {
            let watchlistsInfo = '';
            let watchlists;

            // Vérifier si une ID de watchlist a été fournie
            const watchlistId = interaction.options.getInteger('id');
            const userId = interaction.options.getInteger('user-id');

            if (watchlistId) {
                // Récupérer les données d'une seule watchlist en fonction de l'ID fournie
                const response = await axios.get(`http://localhost:3000/watchlists/find/${watchlistId}`);
                watchlists = [response.data]; // Placer les données dans un tableau pour maintenir la structure du code
            } else if (userId) {
                // Récupérer les données de toutes les watchlists de l'utilisateur spécifié
                const response = await axios.get(`http://localhost:3000/watchlists/findListUser/${userId}`);
                watchlists = response.data;
            } else {
                // Récupérer les données de toutes les watchlists
                const response = await axios.get('http://localhost:3000/watchlists/find');
                watchlists = response.data;
            }

            // Construire la réponse avec les informations des watchlists récupérées
            watchlists.forEach(watchlist => {
                watchlistsInfo += `ID de la watchlist : ${watchlist.id}\nNom de l'utilisateur : ${watchlist.utilisateur}\nNom : ${watchlist.nom}\nItems :`;

                // Ajouter les informations sur chaque item de la watchlist
                watchlist.items.forEach(item => {
                    watchlistsInfo += `\n- Nom du film : ${item.titre}, État : ${item.etat}`;
                });

                // Ajouter une ligne vide entre chaque watchlist pour la clarté
                watchlistsInfo += '\n\n';
            });

            // Envoyer la réponse dans le chat Discord
            await interaction.reply(watchlistsInfo);
        } catch (error) {
            await interaction.reply('Une erreur s\'est produite lors de la récupération des informations de la watchlist.');
        }
    },
};
