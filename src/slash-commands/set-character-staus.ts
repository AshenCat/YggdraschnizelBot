import { SlashCommandBuilder, TextChannel } from 'discord.js';
import { updateBulletin } from '../common-functions';
import { BULLETIN_CHANNEL_ID, BULLETIN_MESSAGE_ID, DEV } from '../config';
import ValheimUser from '../db/models/valheimUser.model';
import { SlashCommand } from '../types';

export const setCharacterStatus: SlashCommand = {
    command: new SlashCommandBuilder()
        .addStringOption(option => 
            option
                .setName('ign')
                .setDescription('Valheim character name')
                .setRequired(true))
        .addStringOption(option => 
            option
                .setName('status')
                .setDescription('status of the character [online, offline])')
                .setRequired(true))
        .setName(`${DEV ? 'dev_' : ''}set_character_status`)
        .setDescription('Changes the status of the character at the bulletin'),

    async run(interaction) {
        await interaction.deferReply({ephemeral: true, });

        const { options } = interaction;

        const IGN = options.get('ign')?.value + '';
        const status = options.get('status')?.value + '';

        let user = await ValheimUser.findOne({IGN});

        if (!user) {
            user = await ValheimUser.create({IGN, status, lastLogin: Date.now()})
        }

        user.status = status || 'online';
        if (user.status === 'online')
            user.lastLogin = new Date();

        await user.save();

        const embed = await updateBulletin();
        const bulletinChannel = interaction.guild?.channels.cache.get(BULLETIN_CHANNEL_ID) || (await interaction.guild?.channels.fetch(BULLETIN_CHANNEL_ID))
        if (bulletinChannel?.isTextBased()) {
            // (<TextChannel>bulletinChannel).send({embeds: [embed]})
            const prevMessage = await bulletinChannel.messages.fetch({ message: BULLETIN_MESSAGE_ID });
            if (!prevMessage) {
                (<TextChannel>bulletinChannel).send({ embeds: [embed] })
            }

            const unixTimestamp = Math.floor(new Date().getTime() / 1000)
            prevMessage.edit({ embeds: [embed], content: `Last edited: <t:${unixTimestamp}:R>` })
        }
        await interaction.editReply({content: 'Bulletin updated'})
    },
};
