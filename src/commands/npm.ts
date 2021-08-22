import fetch from "node-fetch";
import { Message, MessageEmbed } from "discord.js";
import { sendMessage } from "../helpers/sendmessage.js";
import { Dokyumentēshon } from "../interfaces";
import { NPMSPackageResponse } from "../types";

async function run(client: Dokyumentēshon, message: Message, args: string[]): Promise<void> {
	if (args.length === 0) return;

	const response: NPMSPackageResponse | { code: string; message: string; } = await fetch(
		`https://api.npms.io/v2/package/${args[0].replace("/", "%2F")}`)
		.then(x => x.json());

	if ((response as NPMSPackageResponse).analyzedAt === undefined) return;

	const metadata = (response as NPMSPackageResponse).collected.metadata;

	const embed = new MessageEmbed()
		.setAuthor("npm", "https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png")
		.setTitle(metadata.name)
		.setURL(metadata.links.npm)
		.setDescription(metadata.description)
		.addField("Version", metadata.version, true)
		.addField("Author", metadata.author.name, true)
		.addField("Published", new Date(metadata.date).toDateString(), true)
		.setColor(0xcb0000);

	await sendMessage({
		client,
		commandMessage: message,
		messageOptions: { embed, content: null }
	});
}

export default {
	run,
	name: "npm",
	aliases: [],
	description: "Build amazing things.\n" +
		"This command searches [npm](https://www.npmjs.com/) for the specified package.",
	example: "npm `<package>`\n\nExamples:\n• npm discord.js\n• npm @discordjs/voice\n• npm discord-api-types",
	ownerOnly: false,
	channelPermissions: 18432	// SEND_MESSAGES, EMBED_LINKS
};