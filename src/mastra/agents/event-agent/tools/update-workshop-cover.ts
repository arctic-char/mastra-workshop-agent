import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { getLumaEvent, updateLumaEvent } from '../../../lib/luma/client';
import { uploadLumaImageFromRemoteUrl } from '../../../lib/luma/images';
import { upsertWorkshopFromLumaEvent } from '../../../lib/sanity/workshops';

function isLumaImageUrl(imageUrl: string): boolean {
  const hostname = new URL(imageUrl).hostname.toLowerCase();
  return hostname === 'lumacdn.com' || hostname.endsWith('.lumacdn.com');
}

const updateWorkshopCoverTool = createTool({
  id: 'update-workshop-cover',
  description: 'Replace a workshop cover image in Luma and sync the new image to its corresponding Sanity workshop. Use the Luma image URL supplied with an attached Slack image, or another public image URL.',
  requireApproval: true,
  inputSchema: z.object({
    eventId: z.string().min(1).describe('Luma API ID of the workshop to update'),
    imageUrl: z.url().describe('Luma image URL supplied with a Slack attachment, or another public image URL'),
  }),
  outputSchema: z.object({
    eventId: z.string(),
    eventUrl: z.string(),
    coverImageUrl: z.string(),
    sanityDocId: z.string(),
    sanityAction: z.enum(['created', 'updated']),
  }),
  execute: async ({ eventId, imageUrl }) => {
    await getLumaEvent(eventId);

    const coverImageUrl = isLumaImageUrl(imageUrl)
      ? imageUrl
      : await uploadLumaImageFromRemoteUrl(imageUrl);
    await updateLumaEvent(eventId, { cover_url: coverImageUrl });

    const event = await getLumaEvent(eventId);
    const sanitySync = await upsertWorkshopFromLumaEvent(event);

    return {
      eventId,
      eventUrl: event.url,
      coverImageUrl: event.cover_url || coverImageUrl,
      sanityDocId: sanitySync.docId,
      sanityAction: sanitySync.action,
    };
  },
});

export default updateWorkshopCoverTool;
