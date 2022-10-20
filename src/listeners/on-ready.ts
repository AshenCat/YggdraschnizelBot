import { Client } from 'discord.js';
import mongoose from 'mongoose';
// import { GUILD_ID } from '../config';
import { DB_CONFIG_STRING } from '../db/config';
// import User from '../db/models/user.model';
import { SlashCommands } from '../slash-commands';

export const onReady = (client: Client) => {
    client.on('ready', () => {
        console.log(`${client.user?.username} is online`);
        const commands = SlashCommands.map((slashCommand) =>
            slashCommand.command.toJSON()
        );
        client.application?.commands.set(commands);

        const MONGO_URI = DB_CONFIG_STRING();

        mongoose.connect(MONGO_URI, async () => {
            console.log('Connected to DB');
        });
    });
};
