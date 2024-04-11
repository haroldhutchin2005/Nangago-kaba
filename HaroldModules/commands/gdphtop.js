const axios = require('axios');

module.exports  = {
    name: "gdphtop",
    hasPermission: "members",
    Programmer: "Jonell Magallanes",
    info: "GDPH leaderboard",
    prefix: "disable",
  usages: "gdphtop",
    category: "GDPH TOOLS",
    cooldowns: 30,

letStart: async function ({ api, event }) {
    const apiUrl = 'https://gdph-top-leaderboard-api-by-jonell.onrender.com/gdphtop';

    try {
        const response = await axios.get(apiUrl);
        const leaderboard = response.data.slice(0, 27);

        let leaderboardMessage = "📊 Top 27 Leaderboard On GDPH Server:\n\n";

        leaderboard.forEach((entry, index) => {
            leaderboardMessage += `Rank ${entry.rank}: ${entry.username} (UserID: ${entry.userID}) - Stars: ${entry.stars}\n\n`;
        });

        api.sendMessage(leaderboardMessage, event.threadID, async (error, messageInfo) => {
            if (error) {
                console.error(error);
                api.sendMessage("An error occurred while sending the leaderboard.", event.threadID);
                return;
            }

            setTimeout(async () => {
                await api.unsendMessage(messageInfo.messageID, event.threadID);
            }, 60000);
        });
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the leaderboard.", event.threadID);
    }
}
}