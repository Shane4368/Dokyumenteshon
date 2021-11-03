import { CommandInteraction, CommandInteractionOptionResolver } from "discord.js";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types";
import { Dokyumentēshon } from "./interfaces";

export type Command = {
	run: (client: Dokyumentēshon, interaction: CommandInteraction, options: CommandInteractionOptionResolver) => Promise<void>;
	description: string;
	example: string | null;
	ownerOnly: boolean;
	channelPermissions: number;
	data: RESTPostAPIApplicationCommandsJSONBody;
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
			author?: {
				name: string;
				email?: string;
				url?: string;
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
			dependencies?: { [key: string]: string; };
			devDependencies?: { [key: string]: string; };
			peerDependencies?: { [key: string]: string; };
			releases: {
				from: string;
				to: string;
				count: number;
			}[];
			hasTestScript?: boolean;
			hasSelectiveFiles?: boolean;
			readme?: string;
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
			statuses?: {
				context: string;
				state: string;
			}[];
		};
		source?: {
			files: {
				readmeSize: number;
				testsSize: number;
				hasChangelog?: boolean;
				hasNpmIgnore?: boolean;
			};
			badges?: {
				urls: {
					original: string;
					shields: string;
					content: string;
				};
				info: {
					service: string;
					type: string;
					modifiers: { [key: string]: string; };
				};
			}[];
			linters: string[];
			coverage?: number;
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