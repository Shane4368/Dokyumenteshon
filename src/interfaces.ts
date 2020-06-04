import { Client, Collection } from "discord.js";
import { Command } from "./types";

export interface Dokyumentēshon extends Client {
	commands?: Collection<string, Command>;
	/**
	 * Map<commandMessageID, sentMessageID>
	 */
	messages?: Map<string, string>;
}