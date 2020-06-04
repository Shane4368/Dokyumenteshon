import { Message } from "discord.js";
import fetch from "node-fetch";
import { sendMessage } from "../helpers/sendmessage";
import { Dokyumentēshon } from "../interfaces";
import { MessageEmbed } from "../types";

async function run(client: Dokyumentēshon, message: Message, args: string[]): Promise<void> {
	if (args.length === 0) return;

	const response: MessageEmbed = await fetch(
		"https://djsdocs.sorta.moe/v2/embed?src=stable&q=" + encodeURI(args.join(" ").replace(/#/g, ".")))
		.then(x => x.json());

	response.color = 0x2ecc71;

	await sendMessage({
		client,
		commandMessage: message,
		dataToSend: { embed: response }
	});
}

export = {
	run,
	name: "docs",
	aliases: ["djs"],
	description: "discord.js is a powerful [Node.js](https://nodejs.org/) module " +
		"that allows you to easily interact with the [Discord API](https://discord.com/developers/docs/intro).\n" +
		"This command searches [Discord.js](https://discord.js.org/#/) for the specified query.",
	example: "docs `<query>`\n\nExamples:\n• docs client.user\n• docs guild#me",
	ownerOnly: false,
	channelPermissions: 18432	// SEND_MESSAGES, EMBED_LINKS
};