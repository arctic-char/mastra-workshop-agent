import {
  MastraPlatformExporter,
  Observability,
  SensitiveDataFilter,
} from "@mastra/observability";

export default new Observability({
  configs: {
    default: {
      serviceName: "workshop-agent",
      exporters: [new MastraPlatformExporter()],
      spanOutputProcessors: [new SensitiveDataFilter()],
    },
  },
});
