const { Events } = require('discord.js');

module.exports = {
    /**
     * Nom de l'événement : ClientReady.
     * @type {string}
     */
    name: Events.ClientReady,

    /**
     * Indique si cet événement doit être exécuté une seule fois.
     * @type {boolean}
     */
    once: true,

    /**
     * Fonction exécutée lors de l'événement ClientReady.
     * @param {import('discord.js').Client} client Le client Discord.js.
     * @returns {void}
     */
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};
