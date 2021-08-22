import { Message } from "discord.js";
import { Dokyumentēshon } from "../interfaces";

async function run(client: Dokyumentēshon, message: Message, args: string[]): Promise<void> {
	client.destroy();
}

export default {
	run,
	name: "logout",
	aliases: ["disconnect"],
	description: "Logs out the bot from Discord.",
	example: null,
	ownerOnly: true,
	channelPermissions: 0
};