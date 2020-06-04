import { SendMessageData } from "../types";

/**
 * Send a message to Discord, taking into account message edits.
 */
export async function sendMessage(data: SendMessageData): Promise<void> {
	const { client, commandMessage, dataToSend } = data;
	const lastReplyID = client.messages!.get(commandMessage.id);

	if (lastReplyID != null) {
		const lastReply = commandMessage.channel.messages.cache.get(lastReplyID);

		if (lastReply != null) {
			await lastReply.edit(dataToSend);
			return;
		}
	}

	const msg = await commandMessage.channel.send(dataToSend);

	client.messages!.set(commandMessage.id, msg.id);
}