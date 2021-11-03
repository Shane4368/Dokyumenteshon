import { CommandInteraction, CommandInteractionOptionResolver } from "discord.js";
import type { Dokyumentēshon } from "../interfaces";
import type { Command } from "../types";

async function run(client: Dokyumentēshon, interaction: CommandInteraction, options: CommandInteractionOptionResolver): Promise<void> {
	await interaction.reply({ content: "Command received.", ephemeral: true });
	client.destroy();
}

export default {
	run,
	description: "Logs out the bot from Discord.",
	example: null,
	ownerOnly: true,
	channelPermissions: 0,
	data: {
		name: "logout",
		description: "Logs out the bot from Discord.",
		default_permission: false,
		permissions: [{
			id: process.env.OWNER_ID,
			type: 2,
			permission: true
		}]
	}
} as Command;