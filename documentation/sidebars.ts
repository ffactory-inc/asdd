import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  leadersSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "What is ASDD?",
    },
    {
      type: "category",
      label: "For Leaders",
      collapsed: false,
      items: [
        "for-leaders/index",
        "for-leaders/team-model",
        "for-leaders/maturity-model",
      ],
    },
  ],

  playbookSidebar: [
    {
      type: "category",
      label: "Playbook",
      collapsed: false,
      items: [
        "playbook/index",
        "playbook/discovery-engine",
        "playbook/lifecycle",
        "playbook/sprint-cadence",
        "playbook/change-management",
        "playbook/legacy-migration",
      ],
    },
  ],

  technicalSidebar: [
    {
      type: "category",
      label: "Technical Reference",
      collapsed: false,
      items: [
        "technical-reference/architecture",
        "technical-reference/agent-pipeline",
        "technical-reference/governance",
        "technical-reference/security",
        "technical-reference/state-management",
        "technical-reference/repository-structure",
      ],
    },
  ],

  agentsSidebar: [
    {
      type: "category",
      label: "Agent Catalog",
      link: { type: "doc", id: "agents/overview" },
      collapsed: false,
      items: [
        "agents/overview",
        "agents/discovery-agent",
        "agents/spec-agent",
        "agents/validation-agent",
        "agents/domain-agent",
        "agents/design-agent",
        "agents/task-planning-agent",
        "agents/implementation-agent",
        "agents/qa-agent",
        "agents/refactor-agent",
        "agents/knowledge-agent",
      ],
    },
    {
      type: "category",
      label: "Reference",
      items: [
        "reference/glossary",
        "reference/metrics",
        "reference/phase-gate-checklist",
      ],
    },
  ],
};

export default sidebars;
