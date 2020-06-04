import fs from "fs";
import { Client, Collection, TextChannel } from "discord.js";
import { prefix, token, ownerID } from "../bot-config.json";
import { Dokyumentēshon } from "./interfaces";

const client: Dokyumentēshon = new Client();

client.on("ready", () => console.log(`Ready and logged in as ${client.user!.tag}`));

client.on("message", async (message) => {
	if (message.author.bot || !message.content.startsWith(prefix)) return;
	if (message.channel.type === "dm") return;

	const args = message.content.slice(prefix.length).split(/ +/g);
	const command = args.shift();
	const cmd = client.commands!.get(command!)
		|| client.commands!.find(x => x.aliases.includes(command!));

	if (cmd != null) {
		if (cmd.ownerOnly && message.author.id !== ownerID) return;

		if (cmd.channelPermissions > 0 &&
			!message.channel.permissionsFor(client.user!)!.has(cmd.channelPermissions))
			return;

		await cmd.run(client, message, args).catch(console.error);
	}
});

client.on("messageUpdate", async (before, after) => {
	await client.listeners("message")[0](after);
});

client.on("guildCreate", async (guild) => {
	const channel = guild.channels.cache.find(x => x.permissionsFor(guild.me!)!.has("SEND_MESSAGES"));

	if (channel != null) {
		await (channel as TextChannel).send(
			`My prefix is ${prefix}. ` +
			`See ${prefix}help for the few things I can do for you.`
		);
	}
});

async function loadCommands() {
	client.messages = new Map();	// Used for message edits.
	client.commands = new Collection();
	const files = fs.readdirSync("./dist/src/commands");

	for (const file of files) {
		const command = await import(`./commands/${file}`);
		client.commands.set(command.name, command);
	}
}

loadCommands().then(() => client.login(token));