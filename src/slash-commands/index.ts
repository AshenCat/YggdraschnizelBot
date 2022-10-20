import {  SlashCommand } from '../types';
import { resetAllStatus } from './reset-all-status';
import { setCharacterStatus } from './set-character-staus';


const SlashCommands: SlashCommand[] = [
    setCharacterStatus,
    resetAllStatus
];

// const helpArray: HelpArray = SlashCommands.filter(
//     (command): command is Required<SlashCommand> => !!command.help
// ).map(({ command, help }) => ({
//     subcommandName: command.name,
//     subcommandDescription: command.description,
//     subcommandHelp: help,
// }));

// const helpCommand = HelpCommand(helpArray);

// SlashCommands.push(helpCommand);

export { SlashCommands };
