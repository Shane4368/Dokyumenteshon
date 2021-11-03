import { MessageEmbed, CommandInteraction, CommandInteractionOptionResolver } from "discord.js";
import type { Dokyumentēshon } from "../interfaces";
import type { Command } from "../types.js";

async function run(client: Dokyumentēshon, interaction: CommandInteraction, options: CommandInteractionOptionResolver): Promise<void> {
	const embed = new MessageEmbed()
		.setTitle("Help Menu")
		.setColor("BLUE");

	if (options.data.length === 0) {
		const cmds = client.commands!.filter(x => !x.ownerOnly).map(x => `\`${x.data.name}\``).join(", ");

		embed.setDescription(cmds)
			.setFooter("Specify a command for more info.\nExample: /help docs");
	}
	else {
		const commandName = options.getString("command")!.toLowerCase();
		const cmd = client.commands!.get(commandName);

		if (cmd == null) {
			await interaction.reply({ content: "No such command exists.", ephemeral: true });
			return;
		}

		embed.setDescription(`Command: \`${cmd.data.name}\``)
			.addField("Summary", cmd.description)
			.addField("Usage", `Required: \`<>\` | Optional: \`[]\`\n\n❯ ${cmd.example}`);
	}

	await interaction.reply({ embeds: [embed] });
}

export default {
	run,
	description: "This command displays the help menu you currently see.",
	example: "help `[command]`\n\nExamples:\n• help docs\n• help mdn",
	ownerOnly: false,
	channelPermissions: 18432,	// SEND_MESSAGES, EMBED_LINKS
	data: {
		name: "help",
		description: "Show traditional help menu",
		options: [
			{
				name: "command",
				description: "The specific command to show",
				type: 3
			}
		]
	}
} as Command;