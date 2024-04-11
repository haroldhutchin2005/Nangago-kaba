const axios = require('axios');

module.exports = {
    name: "songs",
    hasPermission: "members",
    Programmer: "Jonell Magallanes",
    info: "Search for songs from GDPH SERVER",
    prefix: "enable",
    category: "GDPH TOOLS",
    usages: "[song title]",
    cooldowns: 30,

letStart: async function ({ api, event, target }) {
    const title = encodeURIComponent(target.join(" "));
    const apiUrl = `https://gdph-song-list-api-by-jonell-magallanes.onrender.com/gdph?songlist=${title}`;

    if (!title) return api.sendMessage("Please provide a song title.\n\nUsage: songs [your search song title]", event.threadID, event.messageID);

    try {
        const searchMessage = await api.sendMessage("🔍 | Checking The Database for Searching songs. Please wait...", event.threadID);

        const response = await axios.get(apiUrl);
        const songs = response.data;

        if (songs.length === 0) {
            await api.sendMessage("No songs found with that title.", event.threadID);
            return api.unsendMessage(searchMessage.messageID);
        }

        for (const song of songs) {
            let resultMessage = `ID: ${song.id}\nSong: ${song.song}\nAuthor: ${song.author}\nSize: ${song.size}\n\n`;
            await api.sendMessage(resultMessage, event.threadID);
        }

        api.unsendMessage(searchMessage.messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
}
}