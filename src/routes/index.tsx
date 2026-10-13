import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hitesh Gottapu — AI Systems Engineer" },
      {
        name: "description",
        content:
          "Building production AI systems, LLM infrastructure, data engineering, AI safety, and enterprise AI applications.",
      },
      { property: "og:title", content: "Hitesh Gottapu — AI Systems Engineer" },
      {
        property: "og:description",
        content: "Production AI systems, LLM infrastructure, and enterprise AI applications.",
      },
    ],
  }),
  component: Portfolio,
});
