import fetch from "node-fetch";
import { Message } from "discord.js";
import { sendMessage } from "../helpers/sendmessage.js";
import { Dokyumentēshon } from "../interfaces";
import { MessageEmbedObject } from "../types";

async function run(client: Dokyumentēshon, message: Message, args: string[]): Promise<void> {
	if (args.length === 0) return;

	let source = "stable";
	const query = args[0];
	const sources = ["stable", "master", "collection", "commando"];

	if (args.length > 1) {
		const inputSource = args[1].toLowerCase();

		if (sources.includes(inputSource)) {
			source = inputSource;
		}
		else {
			await sendMessage({
				client,
				commandMessage: message,
				messageOptions: {
					content: "\\❌ An invalid source was provided.\nSources: " + sources.join(", "),
					embed: null
				}
			});
			return;
		}
	}

	const response: MessageEmbedObject = await fetch(
		`https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${query.replace(/#/g, ".")}`)
		.then(x => x.json());

	if (response === null) return;

	response.color = 0x2ecc71;

	response.fields?.forEach(x => x.value = truncate(x.value));

	await sendMessage({
		client,
		commandMessage: message,
		messageOptions: { content: null, embed: response }
	});
}

function truncate(text: string): string {
	const maxLength = 1024;
	if (text.length <= maxLength) return text;
	text = text.substring(0, maxLength - 3).trimEnd();
	return text.substring(0, text.lastIndexOf(" ")) + "...";
}

export default {
	run,
	name: "docs",
	aliases: ["djs"],
	description: "discord.js is a powerful [Node.js](https://nodejs.org/) module " +
		"that allows you to easily interact with the [Discord API](https://discord.com/developers/docs/intro).\n" +
		"This command searches [Discord.js](https://discord.js.org/#/) for the specified query.",
	example: "docs `<query>` `[source]`\n\nExamples:\n• docs client.user\n• docs collection#first collection",
	ownerOnly: false,
	channelPermissions: 18432	// SEND_MESSAGES, EMBED_LINKS
};