import { Message, MessageOptions } from "discord.js";
import { Dokyumentēshon } from "./interfaces";

export type Command = {
	run: (client: Dokyumentēshon, message: Message, args: string[]) => Promise<void>;
	name: string;
	aliases: string[];
	description: string;
	example: string | null;
	ownerOnly: boolean;
	channelPermissions: number;
};

export type MDNResponse = {
	ID: number;
	Label: string;
	Locale: string;
	Modified: string;
	Slug: string;
	Subpages: unknown[] | null;
	Summary: string;
	Tags: string[];
	Title: string;
	Translations: MDNResponse[] | null;
	UUID: string;
	URL: string;
};

export type MessageEmbedObject = {
	title?: string;
	description: string;
	url: string;
	timestamp?: number;
	color: number;
	footer?: {
		text?: string;
		icon_url?: string;
	};
	image?: {
		url: string;
	};
	thumbnail?: {
		url: string;
	};
	author: {
		name: string;
		icon_url: string;
		url: string;
	};
	fields: {
		name: string;
		value: string;
		inline?: boolean;
	}[];
};

export type SendMessageData = {
	/**
	 * Main hub for interacting with Discord's API.
	 */
	client: Dokyumentēshon;
	/**
	 * The message that executed this command.
	 */
	commandMessage: Message;

	messageOptions: NullablePartial<MessageOptions>;
};

type NullablePartial<T> = {
	[P in keyof T]?: T[P] | null;
};