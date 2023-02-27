const { REST, Routes } = require("discord.js");

const dotenv = require('dotenv')
dotenv.config()
const { TOKEN_ID, CLIENT_ID, GUILD_ID } = process.env;


const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname,"commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const commands = []

for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({version: "10"}).setToken(TOKEN_ID);

(async ()=> {
    try {
        console.log(`[#] Reset Commands (${commands.length})`);

        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),// all servers only CLIENT_ID
            {body: commands}
        )
        console.log(`[#] Commands Reset! (${commands.length})`);
    }
    catch(error){
        console.error(error)
    }
})()