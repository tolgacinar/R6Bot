const { SlashCommandBuilder } = require('@discordjs/builders');

const R6 = require('../r6/r6.js');
const tracker = require('../r6/tracker.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('r6_operators')
        .setDescription('r6 operator stats')
        .addStringOption(option =>
            option.setName('platform')
                .setDescription('game platform')
                .setRequired(true)
                .addChoice('pc', 'pc')
                .addChoice('psn', 'psn')
                .addChoice('xbox', 'xbox'))
        .addStringOption(option => option.setName('name')
            .setDescription('player name')
            .setRequired(true))
        .addStringOption(option => option.setName('operator')
            .setDescription('operator name')
            .setRequired(true))
    ,
    async execute(interaction) {
        await interaction.deferReply();

        let platform = interaction.options.getString("platform");
        let name = interaction.options.getString("name");
        let operator = interaction.options.getString("operator");

        let profile = [];
        let operators = [];
        let header;
        let url_profile = `https://r6.tracker.network/profile/${platform}/${name}`;
        let url_operators = `https://r6.tracker.network/profile/${platform}/${name}/operators`;

        operators = await tracker.Operators(operators, url_operators);
        R6.R6_record(header, name, url_profile, profile);

        await interaction.editReply({ embeds: [R6.Operators(operators, operator.toUpperCase())] });
    }
};
