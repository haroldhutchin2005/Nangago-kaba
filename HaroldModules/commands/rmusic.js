const axios = require('axios');

module.exports = {
    name: "rmusic",
    hasPermission: "members",
    Programmer: "Jonell Magallanes",
    info: "Reupload music from gdph serve",
    prefix: "enable",
    category: "GDPH TOOLS",
    usages: "songlink | title | artist",
    cooldowns: 10,

    letStart: async function ({ api, event, target }) {
        target = String(target).replace(/,/g, ''); // Ensure target is a string and remove any commas

        const [link, ...rest] = target.split("|").map(target => target.trim());
        const [title, artist] = rest;

        const apiUrl = `https://reupload-gdph-music-api-by-jonell.onrender.com/gdph?songlink=${link}&title=${title}&artist=${artist}`;

        if (!link || !title || !artist) {
            return api.sendMessage("Please provide song link, title, and artist.\n\nUsage: rmusic dropboxlink | title | artist", event.threadID, event.messageID);
        }

        try {
            api.sendMessage("☁️ | Reuploading song. Please wait...", event.threadID, event.messageID);

            const response = await axios.get(apiUrl);
            const responseData = response.data.replace(/<\/?b>/g, '').replace(/<hr>/g, '');

            if (response.data.status === "error" && response.data.message === "Upload failed.") {
                return api.sendMessage("An error occurred while processing your request.", event.threadID);
            } else {
                api.sendMessage(`✅ | GDPH REUPLOADER SONG TOOLS RESPONSE\n\n${responseData}`, event.threadID, event.messageID);
            }
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while processing your request.", event.threadID);
        }
    }
};
