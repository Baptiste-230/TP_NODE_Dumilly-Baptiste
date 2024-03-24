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
        .setName('info')
        .setDescription('Affiche les informations sur l\'utilisateur ou le serveur.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Affiche les informations sur l\'utilisateur.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Affiche les informations sur le serveur.')),

    /**
     * Exécute la commande slash pour afficher les informations sur l'utilisateur ou le serveur.
     * @param {CommandInteraction} interaction L'interaction de commande.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'user') {
            const user = interaction.options.getUser('user') || interaction.user;
            await interaction.reply(`Nom d'utilisateur : ${user.username}\nA rejoint le serveur le : ${interaction.guild.members.cache.get(user.id).joinedAt.toDateString()}`);
        } else if (subcommand === 'server') {
            const guild = interaction.guild;
            await interaction.reply(`Nom du serveur : ${guild.name}\nNombre total de membres : ${guild.memberCount}`);
        }
    },
};
