
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN_ID } = process.env;

const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname,"commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for(const file of commandFiles){
	const filePath = path.join(commandsPath,file)
	const command = require(filePath)
	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command);
	}else{
		console.log(`[#]Command failed! [${filePath}] `)
	}
}

client.once(Events.ClientReady, name => {
	console.log(`[#]Ready! Logged in as ${name.user.tag}`);
});

client.login(TOKEN_ID);

//LISTENER

client.on(Events.InteractionCreate,async interaction => {
	if(!interaction.isChatInputCommand()) return
	const command = interaction.client.commands.get(interaction.commandName)
	if(!command){
		console.error("[#] Command is not avaible!")
		return
	}
	try {
		await command.execute(interaction)
	}
	catch (error) {
		console.error(error)
		await interaction.reply("Comando não está disponível.")
	}
})