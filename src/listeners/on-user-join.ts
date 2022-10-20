import { ActivityType, Client } from 'discord.js';

export const onUserJoin = (client: Client) => {
    client.on('guildMemberAdd', async (member) => {
        console.log('member joined: ', member.id);
        client.user?.setActivity({
            name: 'Valheim bulleting',
            type: ActivityType.Streaming,
        });
    });
};
