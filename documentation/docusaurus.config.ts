import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "ASDD Framework",
  tagline: "Agentic Specification-Driven Development",
  favicon: "img/favicon.ico",

  url: "https://ffactory-inc.github.io",
  baseUrl: "/asdd/",

  organizationName: "ffactory-inc",
  projectName: "asdd",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
          editUrl:
            "https://github.com/ffactory-inc/asdd/edit/main/documentation/docs/",
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/logo.png",

    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: "ASDD Framework",
      logo: {
        alt: "ASDD Logo",
        src: "img/logo.png",
        srcDark: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "leadersSidebar",
          position: "left",
          label: "For Leaders",
        },
        {
          type: "docSidebar",
          sidebarId: "playbookSidebar",
          position: "left",
          label: "Playbook",
        },
        {
          type: "docSidebar",
          sidebarId: "technicalSidebar",
          position: "left",
          label: "Technical Reference",
        },
        {
          type: "docSidebar",
          sidebarId: "agentsSidebar",
          position: "left",
          label: "Agent Catalog",
        },
        {
          type: "doc",
          docId: "manifesto",
          label: "Manifesto",
          position: "right",
        },
        {
          href: "https://github.com/ffactory-inc/asdd",
          label: "GitHub",
          position: "right",
        },
      ],
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "Framework",
          items: [
            { label: "Introduction", to: "/" },
            { label: "Manifesto", to: "/manifesto" },
            { label: "Maturity Model", to: "/for-leaders/maturity-model" },
          ],
        },
        {
          title: "Guides",
          items: [
            { label: "Getting Started", to: "/playbook" },
            { label: "Discovery Engine", to: "/playbook/discovery-engine" },
            { label: "Lifecycle", to: "/playbook/lifecycle" },
            { label: "Legacy Migration", to: "/playbook/legacy-migration" },
          ],
        },
        {
          title: "Technical",
          items: [
            { label: "Architecture", to: "/technical-reference/architecture" },
            { label: "Agent Pipeline", to: "/technical-reference/agent-pipeline" },
            { label: "Governance", to: "/technical-reference/governance" },
            { label: "Agent Catalog", to: "/agents/overview" },
          ],
        },
        {
          title: "Reference",
          items: [
            { label: "Glossary", to: "/reference/glossary" },
            { label: "Metrics", to: "/reference/metrics" },
            { label: "Phase Gate Checklist", to: "/reference/phase-gate-checklist" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FFactory. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["yaml", "json", "bash", "typescript"],
    },

    algolia: undefined,
  } satisfies Preset.ThemeConfig,

  plugins: [],
};

export default config;
