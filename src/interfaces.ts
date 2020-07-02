import { Client, Collection } from "discord.js";
import { Command } from "./types";

export interface Dokyumentēshon extends Client {
	commands?: Collection<string, Command>;
	/**
	 * Map<command-message-id, sent-message-id>
	 */
	messages?: Map<string, string>;
}