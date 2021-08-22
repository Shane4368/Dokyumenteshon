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
	fields?: {
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

/**
 * https://api-docs.npms.io/#api-Package-GetPackageInfo
 */
export type NPMSPackageResponse = {
	analyzedAt: string;
	collected: {
		metadata: {
			name: string;
			scope: string;
			version: string;
			description: string;
			keywords: string[];
			date: string;
			author: {
				name: string;
				email?: string;
				username?: string;
			};
			publisher: {
				username: string;
				email: string;
			};
			maintainers: {
				username: string;
				email: string;
			}[];
			repository: {
				type: string;
				url: string;
			};
			links: {
				npm: string;
				homepage: string;
				repository: string;
				bugs: string;
			};
			license: string;
			dependencies: { [key: string]: string; };
			devDependencies: { [key: string]: string; };
			releases: {
				from: string;
				to: string;
				count: number;
			}[];
			hasTestScript: boolean;
			hasSelectiveFiles: boolean;
		};
		npm: {
			downloads: {
				from: string;
				to: string;
				count: number;
			}[];
			dependentsCount: number;
			starsCount: number;
		};
		github?: {
			homepage: string;
			starsCount: number;
			forksCount: number;
			subscribersCount: number;
			issues: {
				count: number;
				openCount: number;
				distribution: { [key: string]: number; };
				isDisabled: boolean;
			};
			contributors: {
				username: string;
				commitsCount: number;
			}[];
			commits: {
				from: string;
				to: string;
				count: number;
			}[];
		};
		source?: {
			files: {
				readmeSize: number;
				testsSize: number;
				hasChangelog: boolean;
			};
			linters: string[];
			outdatedDependencies: {
				[key: string]: {
					required: string;
					stable: string;
					latest: string;
				};
			};
		};
	};
	evaluation: {
		quality: {
			carefulness: number;
			tests: number;
			health: number;
			branding: number;
		};
		popularity: {
			communityInterest: number;
			downloadsCount: number;
			downloadsAcceleration: number;
			dependentsCount: number;
		};
		maintenance: {
			releasesFrequency: number;
			commitsFrequency: number;
			openIssues: number;
			issuesDistribution: number;
		};
	};
	score: {
		final: number;
		detail: {
			quality: number;
			popularity: number;
			maintenance: number;
		};
	};
};