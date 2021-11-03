import fetch from "node-fetch";
import { CommandInteraction, CommandInteractionOptionResolver } from "discord.js";
import type { APIEmbed } from "discord-api-types";
import type { Dokyumentēshon } from "../interfaces";
import type { Command } from "../types";

async function run(client: Dokyumentēshon, interaction: CommandInteraction, options: CommandInteractionOptionResolver): Promise<void> {
	const query = options.getString("query")!;
	const source = options.getString("source") ?? "stable";

	const response: APIEmbed = await fetch(
		`https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${query.replace(/#/g, ".")}`)
		.then(x => x.json());

	if (response === null) {
		await interaction.reply({
			content: "No results were found. Try specifying a different source.",
			ephemeral: true
		});

		return;
	}

	response.color = 0x2ecc71;

	response.fields?.forEach(x => x.value = truncate(x.value));

	await interaction.reply({ embeds: [response] });
}

function truncate(text: string): string {
	const maxLength = 1024;
	if (text.length <= maxLength) return text;
	text = text.substring(0, maxLength - 3).trimEnd();
	return text.substring(0, text.lastIndexOf(" ")) + "...";
}

export default {
	run,
	description: "discord.js is a powerful [Node.js](https://nodejs.org/) module " +
		"that allows you to easily interact with the [Discord API](https://discord.com/developers/docs/intro).\n" +
		"This command searches [Discord.js](https://discord.js.org/#/) for the specified query.",
	example: "docs `<query>` `[source]`\n\nExamples:\n• docs client.user\n• docs collection#first collection",
	ownerOnly: false,
	channelPermissions: 18432,	// SEND_MESSAGES, EMBED_LINKS
	data: {
		name: "docs",
		description: "Search Discord.js official docs",
		options: [
			{
				name: "query",
				description: "The string to search for",
				type: 3,
				required: true
			},
			{
				name: "source",
				description: "The package to search in",
				type: 3,
				choices: [
					{ name: "discord.js@latest", value: "stable" },
					{ name: "discord.js@dev", value: "master" },
					{ name: "@discordjs/collection", value: "collection" },
					{ name: "discord.js-commando", value: "commando" }
				]
			}
		]
	}
} as Command;