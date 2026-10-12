import { channels } from "@mastra/connect";
import { Mastra } from "@mastra/core/mastra";
import { eventAgent } from "./agents/event-agent";
import logger from "./config/logger";
import observability from "./config/observability";
import storage from "./config/storage";
import { slackChannelHandlers } from "./config/channels";

const connectChannels = await channels({
  providers: {
    slack: {
      providerOptions: {
        handlers: slackChannelHandlers,
      },
    },
  },
});

export const mastra = new Mastra({
  agents: {
    "event-agent": eventAgent,
  },
  channels: connectChannels,
  logger,
  observability,
  storage,
});
