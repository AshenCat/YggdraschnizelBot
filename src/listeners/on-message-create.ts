import { Client, EmbedBuilder, TextChannel } from 'discord.js';
import { updateBulletin } from '../common-functions';
import { BULLETIN_CHANNEL_ID, BULLETIN_MESSAGE_ID } from '../config';
import ValheimUser from '../db/models/valheimUser.model';

export const onMessageCreate = (client: Client) => {

    client.on('messageCreate', async (message) => {
        const content = message.content;

        if (message.author.bot) {
            // console.log('BOT')
            // const announcementChannel = message.guild?.channels.cache.get(ANNOUNCEMENT_CHANNEL_ID) || (await message.guild?.channels.fetch(ANNOUNCEMENT_CHANNEL_ID));
            const bulletinChannel = message.guild?.channels.cache.get(BULLETIN_CHANNEL_ID) || (await message.guild?.channels.fetch(BULLETIN_CHANNEL_ID));

            if (content.includes(' has joined.')) {
                const valheimPlayerName = content.replace(' has joined.', '');
                const player = await ValheimUser.findOne({ IGN: valheimPlayerName });
                if (!player) {
                    await ValheimUser.create({
                        IGN: valheimPlayerName.trim(),
                        deaths: 0,
                        status: 'online',
                        lastLogin: Date.now()
                    })
                } else {
                    player.lastLogin = new Date()
                    player.status = 'online';
                    await player.save();
                }
                const embed = await updateBulletin();
                if (bulletinChannel?.isTextBased()) {
                    // (<TextChannel>bulletinChannel).send({embeds: [embed]})
                    const prevMessage = await bulletinChannel.messages.fetch({ message: BULLETIN_MESSAGE_ID });
                    if (!prevMessage) {
                        (<TextChannel>bulletinChannel).send({ embeds: [embed] })
                    }

                    const unixTimestamp = Math.floor(new Date().getTime() / 1000)
                    prevMessage.edit({ embeds: [embed], content: `Last edited: <t:${unixTimestamp}:R>` })
                }
                return;
            }

            if (content.includes(' has left.')) {
                const valheimPlayerName = content.replace(' has left.', '');
                const player = await ValheimUser.findOne({ IGN: valheimPlayerName });
                if (!player) {
                    await ValheimUser.create({
                        IGN: valheimPlayerName.trim(),
                        deaths: 0,
                        status: 'offline',
                        lastLogin: Date.now()
                    })
                } else {
                    player.lastLogin = new Date()
                    player.status = 'offline';
                    await player.save();
                }
                const embed = await updateBulletin();
                if (bulletinChannel?.isTextBased()) {
                    // (<TextChannel>bulletinChannel).send({embeds: [embed]})
                    const prevMessage = await bulletinChannel.messages.fetch({ message: BULLETIN_MESSAGE_ID });
                    if (!prevMessage) {
                        (<TextChannel>bulletinChannel).send({ embeds: [embed] })
                    }

                    const unixTimestamp = Math.floor(new Date().getTime() / 1000)
                    prevMessage.edit({ embeds: [embed], content: `Last edited: <t:${unixTimestamp}:R>` })
                }
                return;
            }

            if (content.includes(' has died')) {
                const valheimPlayerName = content.replace(' has died.', '').replace(` has died for the first time.`, '');
                const player = await ValheimUser.findOne({ IGN: valheimPlayerName });
                if (!player) {
                    await ValheimUser.create({
                        IGN: valheimPlayerName.trim(),
                        deaths: 0,
                        status: 'online',
                    })
                }
                const embed = await updateBulletin();
                if (bulletinChannel?.isTextBased()) {
                    // (<TextChannel>bulletinChannel).send({embeds: [embed]})
                    const prevMessage = await bulletinChannel.messages.fetch({ message: BULLETIN_MESSAGE_ID });
                    if (!prevMessage) {
                        (<TextChannel>bulletinChannel).send({ embeds: [embed] })
                    }

                    const unixTimestamp = Math.floor(new Date().getTime() / 1000)
                    prevMessage.edit({ embeds: [embed], content: `Last edited: <t:${unixTimestamp}:R>` })
                }
                return;
            }

            if (content.includes(`it's their first time on the server!`)) {
                const valheimPlayerName = content.replace('Welcome ', '').replace(`, it's their first time on the server!`, '');
                await ValheimUser.create({
                    IGN: valheimPlayerName.trim(),
                    deaths: 0,
                    status: 'online',
                })
                const embed = await updateBulletin();
                if (bulletinChannel?.isTextBased()) {
                    // (<TextChannel>bulletinChannel).send({embeds: [embed]})
                    const prevMessage = await bulletinChannel.messages.fetch({ message: BULLETIN_MESSAGE_ID });
                    if (!prevMessage) {
                        (<TextChannel>bulletinChannel).send({ embeds: [embed] })
                    }

                    const unixTimestamp = Math.floor(new Date().getTime() / 1000)
                    prevMessage.edit({ embeds: [embed], content: `Last edited: <t:${unixTimestamp}:R>` })
                }
                return;
            }

            if (content.includes(`finished quest`)) {
                const valheimPlayerName = content.split(' finished quest ')[0];
                const player = await ValheimUser.findOne({ IGN: valheimPlayerName });
                if (!player) {
                    await ValheimUser.create({
                        IGN: valheimPlayerName.trim(),
                        deaths: 0,
                        status: 'online',
                        lastLogin: Date.now()
                    })
                } else {
                    player.lastLogin = new Date()
                    player.status = 'online';
                    await player.save();
                }
                const embed = await updateBulletin();
                if (bulletinChannel?.isTextBased()) {
                    // (<TextChannel>bulletinChannel).send({embeds: [embed]})
                    const prevMessage = await bulletinChannel.messages.fetch({ message: BULLETIN_MESSAGE_ID });
                    if (!prevMessage) {
                        (<TextChannel>bulletinChannel).send({ embeds: [embed] })
                    }

                    const unixTimestamp = Math.floor(new Date().getTime() / 1000)
                    prevMessage.edit({ embeds: [embed], content: `Last edited: <t:${unixTimestamp}:R>` })
                }
                return;
            }

            if (['Server is stopping.', 'Server has started!'].includes(content)) {
                await ValheimUser.updateMany({ status: 'online' }, { status: 'offline', lastLogin: Date.now() });
                console.log('Server has stopped.');

                if (content === 'Server is stopping.') {
                    const embed = new EmbedBuilder()
                        .setTitle('INFO')
                        .setDescription('Server is currently under maintenance')
                    if (bulletinChannel?.isTextBased()) {
                        // (<TextChannel>bulletinChannel).send({embeds: [embed]})
                        const prevMessage = await bulletinChannel.messages.fetch({ message: BULLETIN_MESSAGE_ID });
                        if (!prevMessage) {
                            (<TextChannel>bulletinChannel).send({ embeds: [embed] })
                        }

                        const unixTimestamp = Math.floor(new Date().getTime() / 1000)
                        prevMessage.edit({ embeds: [embed], content: `Last edited: <t:${unixTimestamp}:R>` })
                    }
                    return;
                }
                if (content === 'Server has started!') {
                    const embed = await updateBulletin();
                    if (bulletinChannel?.isTextBased()) {
                        // (<TextChannel>bulletinChannel).send({embeds: [embed]})
                        const prevMessage = await bulletinChannel.messages.fetch({ message: BULLETIN_MESSAGE_ID });
                        if (!prevMessage) {
                            (<TextChannel>bulletinChannel).send({ embeds: [embed] })
                        }

                        const unixTimestamp = Math.floor(new Date().getTime() / 1000)
                        prevMessage.edit({ embeds: [embed], content: `Last edited: <t:${unixTimestamp}:R>` })
                    }
                    return;
                }
                return;
            }

            // if (content === 'Top 10 Player Leaderboards:') {
            //     const embedDescription = message.embeds[0].description;
            //     console.log(embedDescription)
            //     if (announcementChannel?.isTextBased()) {
            //         const embed = new EmbedBuilder()
            //             .setTitle('Deaths')
            //             .setDescription(embedDescription ?? null);
            //         (<TextChannel>announcementChannel).send({content: '🥇', embeds: [embed]})
            //     }
            //     return;
            // }

            return;
        }

        if (content === 'pong') {
            await message.reply(`ping`);
        }

        if (content === 'update_bulletin') {
            const embed = await updateBulletin();
            const bulletinChannel = message.guild?.channels.cache.get(BULLETIN_CHANNEL_ID) || (await message.guild?.channels.fetch(BULLETIN_CHANNEL_ID))
            if (bulletinChannel?.isTextBased()) {
                // (<TextChannel>bulletinChannel).send({embeds: [embed]})
                const prevMessage = await bulletinChannel.messages.fetch({ message: BULLETIN_MESSAGE_ID });
                if (!prevMessage) {
                    (<TextChannel>bulletinChannel).send({ embeds: [embed] })
                }

                const unixTimestamp = Math.floor(new Date().getTime() / 1000)
                prevMessage.edit({ embeds: [embed], content: `Last edited: <t:${unixTimestamp}:R>` })
            }
        }
    });
};