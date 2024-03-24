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
        .setName('add-user')
        .setDescription('Ajoute un utilisateur à la base de données.')
        .addStringOption(option => 
            option.setName('username')
                .setDescription('Le nom de l\'utilisateur à ajouter')
                .setRequired(true)),

    /**
     * Exécute la commande slash pour ajouter un utilisateur à la base de données.
     * @param {CommandInteraction} interaction L'interaction de commande.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        try {
            // Récupérer le nom d'utilisateur à partir de l'interaction Discord
            const username = interaction.options.getString('username');

            // Effectuer une requête POST pour ajouter l'utilisateur avec le nom spécifié
            const response = await axios.post('http://localhost:3000/users/add', {
                username: username
            });

            // Construire la réponse avec les détails de l'utilisateur ajouté
            const userAdded = `Utilisateur ${username} a été ajouté.`;

            // Répondre à l'interaction avec la confirmation de l'ajout de l'utilisateur
            await interaction.reply(userAdded);
        } catch (error) {
            await interaction.reply('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur.');
        }
    },
};
