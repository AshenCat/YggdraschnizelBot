import { SlashCommandBuilder, TextChannel } from 'discord.js';
import { updateBulletin } from '../common-functions';
import { BULLETIN_CHANNEL_ID, BULLETIN_MESSAGE_ID, DEV } from '../config';
import ValheimUser from '../db/models/valheimUser.model';
import { SlashCommand } from '../types';

export const resetAllStatus: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName(`${DEV ? 'dev_' : ''}reset_all_status`)
        .setDescription('Marks all users as offline.'),

    async run(interaction) {

        await interaction.deferReply({ephemeral: true});

        await ValheimUser.updateMany({}, {status: 'offline'});

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
            await interaction.editReply({content: 'Bulletin updated'})
        }
    },
};
