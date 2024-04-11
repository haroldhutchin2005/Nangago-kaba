const axios = require('axios');

module.exports = {
    name: "register",
    hasPermission: "members",
    Programmer: "Jonell Magallanes",
    info: "Register an account",
    prefix: "enable",
    category: "GDPH TOOLS",
    usages: "username | password | email",
    cooldowns: 10,

    letStart: async function ({ api, event, target }) {
        target = String(target).replace(/,/g, ''); // Ensure target is a string and remove any commas

        const [username, password, email] = target.split("|").map(target => target.trim());

        if (!username || !password || !email) {
            return api.sendMessage("Invalid format. Please provide username, password, and email separated by '|'.\n\nExample: register username | password | email", event.threadID, event.messageID);
        }

        const apiUrl = `https://gdph-register-accout-api-by-jonell-hp2b.onrender.com/gdphreg`;

        try {
            api.sendMessage("☁️ | Registering your account to database. Please wait...", event.threadID, event.messageID);

            const response = await axios.get(`${apiUrl}?username=${username}&password=${password}&fakeemail=${email}`);

            if (response.data.status === "error" && response.data.message === "Registration failed.") {
                const successMessage = `✅ | Successfully Account Registered. Please login In your Account On GDPH App\n\nUsername: ${username}\nPassword: ${password}\nEmail: ${email}\n\nEnjoyy!!`;
                return api.sendMessage(successMessage, event.threadID, event.messageID);
            } else {
                return api.sendMessage(response.data.message, event.threadID, event.messageID);
            }
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while processing your request.", event.threadID);
        }
    }
};
