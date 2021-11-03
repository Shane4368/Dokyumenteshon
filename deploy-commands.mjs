import fs from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { config } from "dotenv";

config();

const commands = [];
const files = fs.readdirSync("./dist/commands");

for (const file of files)
{
	const command = (await import(`./dist/commands/${file}`)).default;
	commands.push(command.data);
}

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

try
{
	console.log("Begin posting application (/) commands...");

	if (process.env.NODE_ENV === "dev")
	{
		// set guild commands
		await setGlobalCommands(true);
		const cmdData = getOwnerOnlyCommandData(await setGuildCommands());
		await setCommandPermissions(...cmdData);
	}
	else
	{
		// set global commands
		const cmdData = getOwnerOnlyCommandData(await setGlobalCommands());
		await setCommandPermissions(...cmdData);
		await setGuildCommands(true);
	}

	console.log("Application (/) commands have been posted successfully.");
}
catch (error)
{
	console.error(error);
}

function getOwnerOnlyCommandData(appCommands)
{
	const cmd = commands.find(x => x.default_permission === false);
	const appCmd = appCommands.find(x => x.name === cmd.name);
	return [appCmd.id, cmd.permissions];
}

async function setCommandPermissions(commandId, permissions)
{
	await rest.put(
		Routes.applicationCommandPermissions(process.env.CLIENT_ID, process.env.GUILD_ID, commandId),
		{ body: { permissions } }
	);
}

function setGlobalCommands(deleteAll = false)
{
	return rest.put(
		Routes.applicationCommands(process.env.CLIENT_ID),
		{ body: deleteAll ? [] : commands }
	);
}

function setGuildCommands(deleteAll = false)
{
	return rest.put(
		Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
		{ body: deleteAll ? [] : commands }
	);
}