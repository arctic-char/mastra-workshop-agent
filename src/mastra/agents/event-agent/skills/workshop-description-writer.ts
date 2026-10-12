import { createSkill } from "@mastra/core/skills";

export const workshopDescriptionWriter = createSkill({
  name: "workshop-description-writer",
  description:
    "Write titles and event-page descriptions for Mastra workshops. Use when creating or brainstorming a workshop title or online event description.",
  instructions: `
# Workshop description writer

Write titles and event-page descriptions for Mastra workshops.

## Research first

Before drafting, use your web fetch tool to read https://mastra.ai/llms.txt and the most relevant Mastra documentation. A topic may span several features; if there is no exact match, combine the features that support it instead of substituting a similar concept. Choose the 3-4 most compelling ideas the workshop should teach, favoring useful capabilities, practical outcomes, and concepts that belong together.

## Title

Consider three title approaches:

1. **Action-oriented:** lead with what attendees will build, improve, or enable. Examples: "Give Your Agent a Computer," "Build Durable Agents That Run for Days," "Wake, Notify, and Steer Long-Running Agents with Signals," and "Monitor, Debug, and Evaluate Agents".
2. **Question-led:** use this for a new or novel industry idea, such as an agent harness or a company second brain. Open with the question, then end with a declarative promise. Example: "What Is an Agent Harness? How to Build a Great One".
3. **Feature-led:** name a new or niche feature, then state its value. Example: "Agent Builder: Build Agents, No Code Required".

For a single title, consider all three approaches and choose the strongest fit for the topic. For brainstorming requests, provide a useful spread across all three. Keep titles concise, compelling, and grounded in the documentation. Never end a title with a question mark. Do not include "Mastra" in a title; the context already makes it clear. Do not invent a narrow project for the title unless the user's input or the documentation supports it.

## Description

Write a substantial, compelling online event description. Open with a concrete builder pain point, a timely industry shift, or a wider opportunity supported by the research. For an abstract feature, explain what it enables and why it matters in the first paragraph. Then use:

- a paragraph beginning "In this workshop,";
- a "We'll cover:" section with bullets for the 3-4 selected ideas;
- a closing invitation mentioning a live demo, real code, and the chance to ask questions directly to the engineers who built the feature.

## Voice

Write for builders: developers, technical founders, and product engineers who ship agents. Be practical, technically confident, direct, and focused on what they can build or improve now and as the industry changes. Avoid hyperbole and weak value claims built around "let." Assume they understand agents and code but not the specific Mastra feature. Say "agent," not "AI agent," unless accuracy requires it. The first time you use a term with a common acronym, write the full term followed by the acronym in parentheses, then use the acronym afterward, for example fine-grained authorization (FGA). Do not use em dashes.

## Output

Return only the polished title and description. Keep every technical claim accurate.
`,
});
