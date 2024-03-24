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
        .setName('add-item')
        .setDescription('Ajoute un élément à la base de données.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Le nom de l\'élément à ajouter')
                .setRequired(true)),

    /**
     * Exécute la commande slash pour ajouter un élément à la base de données.
     * @param {CommandInteraction} interaction L'interaction de commande.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        try {
            // Récupérer le nom de l'élément à partir de l'interaction Discord
            const name = interaction.options.getString('name');

            // Effectuer une requête POST pour ajouter l'élément avec le nom spécifié
            let response;
            try {
                response = await axios.post('http://localhost:3000/items/add', {
                    titre: name
                });
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    await interaction.reply(error.response.data.error);
                } else {
                    await interaction.reply('Une erreur s\'est produite lors de l\'ajout de l\'élément.');
                }
                return;
            }

            // Construire la réponse avec les détails de l'élément ajouté
            const itemAdded = `Élément ${name} a été ajouté.`;

            // Répondre à l'interaction avec la confirmation de l'ajout de l'élément
            await interaction.reply(itemAdded);
        } catch (error) {
            await interaction.reply('Une erreur s\'est produite lors de l\'ajout de l\'élément.');
        }
    },
};
