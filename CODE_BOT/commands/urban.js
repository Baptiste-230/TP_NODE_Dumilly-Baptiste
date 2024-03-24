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
        .setName('urban')
        .setDescription('Recherche dans le dictionnaire urbain pour le terme donné.')
        .addStringOption(option =>
            option.setName('term')
                .setDescription('Le terme à rechercher.')
                .setRequired(true)),

    /**
     * Exécute la commande slash pour rechercher un terme dans le dictionnaire urbain.
     * @param {CommandInteraction} interaction L'interaction de commande.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        const term = interaction.options.getString('term');
        const url = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.list && data.list.length > 0) {
                const definition = data.list[0].definition;
                await interaction.reply(`**${term}**: ${definition}`);
            } else {
                await interaction.reply(`Aucune définition trouvée pour ${term}`);
            }
        } catch (error) {
            await interaction.reply('Une erreur s\'est produite lors de la récupération des données depuis le dictionnaire urban.');
        }
    },
};
