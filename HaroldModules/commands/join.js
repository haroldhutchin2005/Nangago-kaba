module.exports = {
  name: "join",
  hasPermission: "members",
  Programmer: "GDPH DEVELOPERS",
  info: "Join the member to discord of GDPH Channel",
  usages: "join",
  prefix: "disable",
  cooldowns: 30,

  letStart: async function ({ pushMessage }) { 
    pushMessage.reply("Join Discord our Server Channel\n\nhttps://discord.com/invite/8NUWpHJS"); 
  }
};
