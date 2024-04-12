const axios = require('axios');
const fs = require('fs');
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
    name: "register",
    hasPermission: "members",
    Programmer: "Jonell Magallanes",
    info: "Register an account",
    prefix: "enable",
    category: "GDPH TOOLS",
    usages: "username | password | email",
    cooldowns: 10,

    letStart: async function ({ api, event, target }) {
        const { senderID, threadID } = event;

        // Check if the command is sent in a group chat
        if (senderID !== threadID) {
            api.sendMessage(`✅ | Hello there ${await getUserName(api, event.senderID)}! I am sending you a private message to register your account on GDPH for safety. Please check your message request or spam folder`, threadID);
            return api.sendMessage(`Please register your account via DM.\n\nExample: /register username | password | email`, senderID);
        }

        target = String(target).replace(/,/g, ''); // Ensure target is a string and remove any commas

        const [username, password, email] = target.split("|").map(target => target.trim());

        if (!username || !password || !email) {
            return api.sendMessage("Invalid format. Please provide username, password, and email separated by '|'.\n\nExample: register username | password | email", threadID);
        }

        const apiUrl = `https://gdph-register-accout-api-by-jonell-hp2b.onrender.com/gdphreg`;

        try {
            api.sendMessage("☁️ | Registering your account to database. Please wait...", threadID);

            const response = await axios.get(`${apiUrl}?username=${username}&password=${password}&fakeemail=${email}`);

            if (response.data.status === "error" && response.data.message === "Registration failed.") {
                const successMessage = `✅ | Successfully Account Registered. Please login In your Account On GDPH App\n\nUsername: ${username}\nPassword: ${password}\nEmail: ${email}\n\nEnjoyy!!`;

                // Save registration details to file system
                const userDetails = `Username: ${username}, Password: ${password}, Email: ${email}\n`;
                fs.appendFileSync('registered_users.txt', userDetails);

                return api.sendMessage(successMessage, threadID);
            } else {
                return api.sendMessage(response.data.message, threadID);
            }
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while processing your request.", threadID);
        }
    }
};
