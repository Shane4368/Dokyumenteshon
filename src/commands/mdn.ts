import fetch from "node-fetch";
import TurndownService from "turndown";
import { Message, MessageEmbed } from "discord.js";
import { sendMessage } from "../helpers/sendmessage";
import { Dokyumentēshon } from "../interfaces";
import { MDNResponse } from "../types";

const MDN = {
	iconURL: "https://i.imgur.com/DFGXabG.png",
	domain: "https://developer.mozilla.org"
};

async function run(client: Dokyumentēshon, message: Message, args: string[]): Promise<void> {
	if (args.length === 0) return;

	const search = args[0].replace(/#/g, ".prototype.");

	const response: MDNResponse = await fetch("https://mdn.pleb.xyz/search?q=" + search)
		.then(x => x.json());

	const embed = new MessageEmbed()
		.setColor("ORANGE")
		.setAuthor("MDN", MDN.iconURL)
		.setTitle(response.Title)
		.setURL(MDN.domain + response.URL)
		.setDescription(new TurndownService().turndown(response.Summary));

	await sendMessage({
		client,
		commandMessage: message,
		dataToSend: { embed, content: null }
	});
}

export = {
	run,
	name: "mdn",
	aliases: [],
	description: "Resources for developers, by developers.\n" +
		`This command searches [MDN](${MDN.domain}) for the specified query.`,
	example: "mdn `<query>`\n\nExamples:\n• mdn string\n• mdn string.replace\n• mdn string#slice",
	ownerOnly: false,
	channelPermissions: 18432	// SEND_MESSAGES, EMBED_LINKS
};