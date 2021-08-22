import { default as MDNScraper, Result } from "mdn-scraper";
import { Message, MessageEmbed } from "discord.js";
import { sendMessage } from "../helpers/sendmessage.js";
import { Dokyumentēshon } from "../interfaces";

const MDN = {
	iconURL: "https://i.imgur.com/DFGXabG.png",
	domain: "https://developer.mozilla.org"
};

async function run(client: Dokyumentēshon, message: Message, args: string[]): Promise<void> {
	if (args.length === 0) return;

	try {
		const response = await (MDNScraper as any).default(args.join(" ")) as Result;

		const embed = new MessageEmbed()
			.setColor("ORANGE")
			.setAuthor("MDN", MDN.iconURL)
			.setTitle(response.title)
			.setURL(response.url)
			.setDescription(response.parsed);

		await sendMessage({
			client,
			commandMessage: message,
			messageOptions: { embed, content: null }
		});
	}
	catch (error) {
		console.error(error);

		await message.channel.send(
			"\\⚠️ An error occurred while retrieving the data. The server is probably down."
		);
	}
}

export default {
	run,
	name: "mdn",
	aliases: [],
	description: "Resources for developers, by developers.\n" +
		`This command searches [MDN](${MDN.domain}) for the specified query.`,
	example: "mdn `<query>`\n\nExamples:\n• mdn string\n• mdn string.replace\n• mdn string#slice",
	ownerOnly: false,
	channelPermissions: 18432	// SEND_MESSAGES, EMBED_LINKS
};