import type { ChannelHandler, ChannelHandlers } from '@mastra/core/channels';
import { uploadLumaImageFromDataUrl, uploadLumaImageFromRemoteUrl } from '../lib/luma/images';

const prepareSlackImage: ChannelHandler = async (thread, message, defaultHandler) => {
  const requestsImageUpdate = /\b(cover|image|photo|picture|artwork|thumbnail)\b|\buse this\b/i.test(message.text);
  if (!requestsImageUpdate) {
    await defaultHandler(thread, message);
    return;
  }

  const image = message.attachments.find(
    (attachment) => attachment.type === 'image' || attachment.mimeType?.startsWith('image/'),
  );

  if (!image) {
    await defaultHandler(thread, message);
    return;
  }

  const mimeType = image.mimeType || 'image/png';
  let imageUrl: string | undefined;

  if (image.fetchData || image.data) {
    const data = image.fetchData ? await image.fetchData() : image.data!;
    const bytes = data instanceof Blob
      ? Buffer.from(await data.arrayBuffer())
      : data instanceof ArrayBuffer
        ? Buffer.from(new Uint8Array(data))
        : Buffer.from(data);
    const dataUrl = `data:${mimeType};base64,${bytes.toString('base64')}`;
    imageUrl = await uploadLumaImageFromDataUrl(dataUrl);
  } else if (image.url) {
    imageUrl = await uploadLumaImageFromRemoteUrl(image.url);
  }

  if (imageUrl) {
    const note = `Attached workshop image uploaded to Luma: ${imageUrl}`;
    message.text = [message.text, note].filter(Boolean).join('\n\n');
    message.formatted.children.push({
      type: 'paragraph',
      children: [{ type: 'text', value: note }],
    });
  }

  await defaultHandler(thread, message);
};

export const slackChannelHandlers = {
  onDirectMessage: prepareSlackImage,
  onMention: prepareSlackImage,
  onSubscribedMessage: prepareSlackImage,
} satisfies ChannelHandlers;
