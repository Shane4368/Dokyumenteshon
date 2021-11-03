import fs from "fs";
import { config } from "dotenv";
import { Client, Collection, CommandInteractionOptionResolver, Intents } from "discord.js";
import { Dokyumentēshon } from "./interfaces";
import { Command } from "./types";

config();

const client: Dokyumentēshon = new Client({
	intents: [Intents.FLAGS.GUILDS]
});

client.on("ready", () => console.log(`Ready and logged in as ${client.user!.tag}`));

client.on("interactionCreate", (interaction) => {
	if (!interaction.isCommand() || !interaction.inGuild()) return;

	const cmd = client.commands!.get(interaction.commandName);

	if (cmd != null) {
		if (cmd.ownerOnly && interaction.user.id !== process.env.OWNER_ID) return;

		cmd.run(
			client,
			interaction,
			interaction.options as CommandInteractionOptionResolver
		).catch(console.error);
	}
});

async function loadCommands() {
	client.commands = new Collection();
	const files = fs.readdirSync("./dist/commands");

	for (const file of files) {
		const command = (await import(`./commands/${file}`)).default as Command;
		client.commands.set(command.data.name, command);
	}
}

await loadCommands();
await client.login(process.env.TOKEN);