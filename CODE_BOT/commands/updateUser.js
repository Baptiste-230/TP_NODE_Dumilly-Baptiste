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
        .setName('update-user')
        .setDescription('Met à jour un utilisateur dans la base de données.')
        .addIntegerOption(option =>
            option.setName('id')
                .setDescription('L\'ID de l\'utilisateur à mettre à jour')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Le nouveau nom d\'utilisateur')
                .setRequired(true)),

    /**
     * Exécute la commande slash pour mettre à jour un utilisateur dans la base de données.
     * @param {CommandInteraction} interaction L'interaction de commande.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        try {
            // Récupérer l'ID et le nouveau nom d'utilisateur à partir de l'interaction Discord
            const id = interaction.options.getInteger('id');
            const username = interaction.options.getString('username');

            // Effectuer une requête PUT pour mettre à jour l'utilisateur avec l'ID spécifié
            try {
                const response = await axios.patch(`http://localhost:3000/users/update/${id}`, {
                    username: username
                });
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    await interaction.reply(error.response.data.error);
                } else {
                    await interaction.reply('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur.');
                }
                return;
            }

            // Construire la réponse avec les détails de l'utilisateur mis à jour
            const userUpdated = `Utilisateur ${id} a été mis à jour avec le nom ${username}.`;

            // Répondre à l'interaction avec la confirmation de la mise à jour de l'utilisateur
            await interaction.reply(userUpdated);
        } catch (error) {
            await interaction.reply('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur.');
        }
    },
};
