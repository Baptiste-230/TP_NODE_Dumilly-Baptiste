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
        .setName('find-users')
        .setDescription('Affiche des informations sur l\'utilisateur qui a exécuté la commande.'),

    /**
     * Exécute la commande slash pour afficher les informations sur les utilisateurs.
     * @param {CommandInteraction} interaction L'interaction de commande.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        try {
            // Faites une requête GET pour obtenir les données depuis http://localhost:3000/users/find
            const response = await axios.get('http://localhost:3000/users/find');
            const users = response.data;

            // Formatez les données pour les afficher dans la réponse de la commande slash
            const userList = users.map(user => `Utilisateur ${user.id} : ${user.username}`).join('\n');

            // Répondez à l'interaction avec la liste des utilisateurs
            await interaction.reply(userList);
        } catch (error) {
            await interaction.reply('Une erreur s\'est produite lors de la récupération des utilisateurs.');
        }
    },
};
