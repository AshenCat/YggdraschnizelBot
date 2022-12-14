import { EmbedBuilder } from "discord.js";
import ValheimUser from "./db/models/valheimUser.model";

export const updateBulletin = async () => {
    const players = await ValheimUser.find({}).sort({status: -1, lastLogin: -1});

    // const descriptionString = [];

    const embedFields = [];

    const names = [];
    const statuses = [];
    const lastLogins = [];

    for (const player of players) {
        const unixTimestamp = Math.floor(new Date(player.lastLogin).getTime() / 1000)

        names.push(player.IGN)
        statuses.push(player.status === 'online' ? 'š¢ ONLINE' : 'ā« OFFLINE' )
        lastLogins.push(player.status === 'online' ? 'now' : `${(player.lastLogin?.getFullYear() || 1) > 2000 ? `<t:${unixTimestamp}:R>` : 'NULL'}`)
        // descriptionString.push(`${ player.status === 'online' ? 'š¢ ' : 'ā« '}` + player.IGN);
        
        // descriptionString.push(`${player.status === 'online' ? 'ONLINE' : 'OFFLINE'}  Ā·  since ${(player.lastLogin?.getFullYear() || 1) > 2000 ? `<t:${unixTimestamp}:R>` : 'NULL'}`);
    }

    embedFields.push({name: 'Player IGN:', value: names.join('\n'), inline: true})
    // embedFields.push({name: '\u200B', value: '\u200B', inline: true})
    embedFields.push({name: 'Status:', value: statuses.join('\n'), inline: true})        
    // embedFields.push({name: '\u200B', value: '\u200B', inline: true})
    embedFields.push({name: 'Last Activity:', value: lastLogins.join('\n'), inline: true})

    // embedFields.push({name: 'oneLiner: ', value: descriptionString.join('\n')})

    const embed = new EmbedBuilder()
        // .setTitle('ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬\nā¬ā¬ :_P::_L::_A::_Y::_E::_R::blank::_L::_I::_S::_T:ā¬ā¬ā¬\nā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬')
        .setTitle('ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā„ā£āā¢ā¤ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬\n                       šššš  šš  ššš  ššš¢\nā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¢ā¤āā„ā£ā¬ā¬ā¬ā¬ā¬ā¬ā¬ā¬')
        // .setDescription();
    embed.addFields(embedFields);

    return embed;
}