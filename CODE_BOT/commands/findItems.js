const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

/**
 * Fonction pour diviser la liste d'items en pages.
 * @param {Array} items La liste des items à paginer.
 * @param {number} pageSize La taille de chaque page.
 * @returns {Array} Les pages résultantes.
 */
function paginate(items, pageSize) {
    const pages = [];
    for (let i = 0; i < items.length; i += pageSize) {
        pages.push(items.slice(i, i + pageSize));
    }
    return pages;
}

module.exports = {
    /**
     * Informations sur la commande slash.
     * @type {SlashCommandBuilder}
     */
    data: new SlashCommandBuilder()
        .setName('find-items')
        .setDescription('Affiche des informations sur les items disponibles.'),

    /**
     * Exécute la commande slash pour afficher des informations sur les items disponibles.
     * @param {import('discord.js').CommandInteraction} interaction L'interaction de commande.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        try {
            const response = await axios.get('http://localhost:3000/items/find');
            const items = response.data;

            // Diviser les items en pages de 10
            const pageSize = 10;
            const itemPages = paginate(items, pageSize);

            // Envoyer chaque page comme un message séparé
            for (const page of itemPages) {
                const itemList = page.map(item => {
                    return `Titre : ${item.titre}\nAnnée : ${item.annee}\nRéalisateur : ${item.realisateur}\nDescription : ${item.Description}\nLangue : ${item.Langue}\nType : ${item.Type}\n\n`;
                }).join('\n');
                await interaction.reply(itemList);
            }

        } catch (error) {
            await interaction.reply('Une erreur s\'est produite lors de la récupération des items.');
        }
    },
};
