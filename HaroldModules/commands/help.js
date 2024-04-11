const fs = require('fs');
const { join } = require('path');

async function getUserName(api, senderID) {
  try {
    const userInfo = await api.getUserInfo(senderID);
    return userInfo[senderID]?.name || "User";
  } catch (error) {
    console.log(error);
    return "User";
  }
}

module.exports = {
  name: "help",
  Programer: "Jonell Magallanes",
  info: "Shows a list of available commands with pagination",
  usages: "[page number]",
  hasPermission: "anyone",
  prefix: "enable",
  letStart: async function ({ api, event, target }) {
    const commandsPath = join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    const commands = commandFiles.map(file => {
      const command = require(join(commandsPath, file));
      return { name: command.name, info: command.info, usages: command.usages, hasPermission: command.hasPermission, prefix: command.prefix };
    });

    const itemsPerPage = 7;
    let page = parseInt(target[0]) || 1;

    // calculate pagination details
    const totalCommands = commands.length;
    const totalPages = Math.ceil(totalCommands / itemsPerPage);
    page = page < 1 ? 1 : page > totalPages ? totalPages : page; // ensure page is within bounds
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    let helpText = `${await getUserName(api, event.senderID)} Here the commands to help you ${global.harold.name}:\n\n`;

    // slice commands for the current page
    const commandsToShow = commands.slice(start, end);

    commandsToShow.forEach(command => {
      helpText += `╭─❍\n➥ ɴᴀᴍᴇ: ${command.name}\n➥ ᴅᴇsᴄʀɪᴘᴛɪᴏɴ: ${command.info}\n➥ ᴘᴇʀᴍɪssɪᴏɴ: ${command.hasPermission}\n➥ ᴜsᴀɢᴇs: ${command.usages}\n➥ ɴᴇᴇᴅᴇᴅ ᴘʀᴇғɪx: ${command.prefix}\n╰───────────⟡\n`;
    });

    if (page < totalPages) {
      helpText += `Type '${global.harold.prefix}help ${page + 1}' to see the next page of commands`;
    }

    api.sendMessage(helpText, event.threadID, event.messageID);
  }
};
