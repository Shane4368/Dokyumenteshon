import { Message, MessageEmbed } from "discord.js";
import { sendMessage } from "../helpers/sendmessage";
import { Dokyumentēshon } from "../interfaces";

async function run(client: Dokyumentēshon, message: Message, args: string[]): Promise<void> {
	const embed = new MessageEmbed()
		.setTitle("Help Menu")
		.setColor("BLUE");

	if (args.length === 0) {
		const cmds = client.commands!.filter(x => !x.ownerOnly).map(x => `\`${x.name}\``).join(", ");

		embed.setDescription(cmds)
			.setFooter("Specify a command for more info: docs help");
	}
	else {
		const commandName = args[0].toLowerCase();

		const cmd = client.commands!.get(commandName)
			|| client.commands!.find(x => x.aliases.includes(commandName));

		if (cmd == null) return;

		embed.setDescription(
			`Command: \`${cmd.name}\`\nAliases: ${cmd.aliases.map(x => `\`${x}\``).join(", ")}`)
			.addField("Summary", cmd.description)
			.addField("Usage", `Required: \`<>\` | Optional: \`[]\`\n\n❯ ${cmd.example}`);
	}

	await sendMessage({
		client,
		commandMessage: message,
		dataToSend: { embed, content: null }
	});
}

export = {
	run,
	name: "help",
	aliases: ["assist"],
	description: "This command displays the help menu you currently see.",
	example: "help `[command]`\n\nExamples:\n• help docs\n• help mdn",
	ownerOnly: false,
	channelPermissions: 18432	// SEND_MESSAGES, EMBED_LINKS
};