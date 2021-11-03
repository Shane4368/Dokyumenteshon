import { default as MDNScraper, Result } from "mdn-scraper";
import { CommandInteraction, CommandInteractionOptionResolver, MessageEmbed } from "discord.js";
import type { Dokyumentēshon } from "../interfaces";
import type { Command } from "../types.js";

const MDN = {
	iconURL: "https://i.imgur.com/DFGXabG.png",
	domain: "https://developer.mozilla.org"
};

async function run(client: Dokyumentēshon, interaction: CommandInteraction, options: CommandInteractionOptionResolver): Promise<void> {
	try {
		const response = await (MDNScraper as any).default(options.getString("query")) as Result;

		if ((response as any).error) {
			await interaction.reply({
				content: "Could not find what you were looking for.",
				ephemeral: true
			});
			return;
		}

		const embed = new MessageEmbed()
			.setColor("ORANGE")
			.setAuthor("MDN", MDN.iconURL)
			.setTitle(response.title)
			.setURL(response.url)
			.setDescription(response.parsed);

		await interaction.reply({ embeds: [embed] });
	}
	catch (error) {
		console.error(error);

		await interaction.reply({
			content: "\\⚠️ An error occurred while retrieving the data. The server is probably down.",
			ephemeral: true
		});
	}
}

export default {
	run,
	description: "Resources for developers, by developers.\n" +
		`This command searches [MDN](${MDN.domain}) for the specified query.`,
	example: "mdn `<query>`\n\nExamples:\n• mdn string\n• mdn string.replace\n• mdn string#slice",
	ownerOnly: false,
	channelPermissions: 18432,	// SEND_MESSAGES, EMBED_LINKS
	data: {
		name: "mdn",
		description: "Search MDN Web Docs",
		options: [
			{
				name: "query",
				description: "The string to search for",
				type: 3,
				required: true
			}
		]
	}
} as Command;