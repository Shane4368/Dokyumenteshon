import { Client, Message } from "discord.js";

async function run(client: Client, message: Message, args: string[]): Promise<void> {
	client.destroy();
}

export = {
	run,
	name: "logout",
	aliases: ["disconnect"],
	description: "Logs out the bot from Discord.",
	example: null,
	ownerOnly: true,
	channelPermissions: 0
};