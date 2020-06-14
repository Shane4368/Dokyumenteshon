import fs from "fs";
import { config } from "dotenv";
import { Client, Collection, TextChannel } from "discord.js";
import { Dokyumentēshon } from "./interfaces";

config();
const prefix = process.env.PREFIX!;
const client: Dokyumentēshon = new Client();

client.on("ready", () => console.log(`Ready and logged in as ${client.user!.tag}`));

client.on("message", async (message) => {
	if (message.author.bot || !message.content.startsWith(prefix)) return;
	if (message.channel.type === "dm") return;

	const args = message.content.slice(prefix.length).split(/ +/g);
	const command = args.shift()!.toLowerCase();
	const cmd = client.commands!.get(command)
		|| client.commands!.find(x => x.aliases.includes(command));

	if (cmd != null) {
		if (cmd.ownerOnly && message.author.id !== process.env.OWNER_ID) return;

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
	const files = fs.readdirSync("./dist/commands");

	for (const file of files) {
		const command = await import(`./commands/${file}`);
		client.commands.set(command.name, command);
	}
}

loadCommands().then(() => client.login(process.env.TOKEN));