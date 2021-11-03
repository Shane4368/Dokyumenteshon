import fetch from "node-fetch";
import { CommandInteraction, CommandInteractionOptionResolver, MessageEmbed } from "discord.js";
import type { Dokyumentēshon } from "../interfaces";
import type { Command, NPMSPackageResponse } from "../types";

async function run(client: Dokyumentēshon, interaction: CommandInteraction, options: CommandInteractionOptionResolver): Promise<void> {
	const response: NPMSPackageResponse | { code: string; message: string; } = await fetch(
		`https://api.npms.io/v2/package/${options.getString("package")!.replace("/", "%2F")}`)
		.then(x => x.json());

	if ("message" in response) {
		await interaction.reply({ content: `\\🚫 ERROR: ${response.message}.`, ephemeral: true });
		return;
	}

	const metadata = (response as NPMSPackageResponse).collected.metadata;

	const embed = new MessageEmbed()
		.setAuthor("npm", "https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png")
		.setTitle(metadata.name)
		.setURL(metadata.links.npm)
		.setDescription(metadata.description)
		.addField("Version", metadata.version, true)
		.addField("Publisher", metadata.publisher.username, true)
		.addField("Published", `<t:${Math.floor(new Date(metadata.date).valueOf() / 1e+3)}:D>`, true)
		.setColor(0xcb0000);

	await interaction.reply({ embeds: [embed] });
}

export default {
	run,
	description: "Build amazing things.\n" +
		"This command searches [npm](https://www.npmjs.com/) for the specified package.",
	example: "npm `<package>`\n\nExamples:\n• npm discord.js\n• npm @discordjs/voice\n• npm discord-api-types",
	ownerOnly: false,
	channelPermissions: 18432,	// SEND_MESSAGES, EMBED_LINKS
	data: {
		name: "npm",
		description: "Search npm for package",
		options: [
			{
				name: "package",
				description: "The package name",
				type: 3,
				required: true
			}
		]
	}
} as Command;