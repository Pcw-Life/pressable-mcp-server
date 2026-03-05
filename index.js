const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
require('dotenv').config();

// Import tools
const accountTools = require('./tools/account');
const siteTools = require('./tools/sites');
const dnsTools = require('./tools/dns');
const cacheTools = require('./tools/cache');
const contentTools = require('./tools/content');
const serverTools = require('./tools/server');
const automationTools = require('./tools/automation');
const backupTools = require('./tools/backups');
const usageTools = require('./tools/usage');
const collaboratorTools = require('./tools/collaborators');

const allTools = [
    ...accountTools,
    ...siteTools,
    ...dnsTools,
    ...cacheTools,
    ...contentTools,
    ...serverTools,
    ...automationTools,
    ...backupTools,
    ...usageTools,
    ...collaboratorTools
];

const server = new Server(
    {
        name: 'pressable-mcp-server',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: allTools.map(t => ({
            name: t.name,
            description: t.description,
            inputSchema: t.inputSchema
        }))
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const tool = allTools.find(t => t.name === request.params.name);
    if (!tool) {
        throw new Error(`Tool not found: ${request.params.name}`);
    }

    try {
        const result = await tool.handler(request.params.arguments);
        return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
        };
    } catch (error) {
        return {
            content: [{ type: 'text', text: `Error: ${error.message}` }],
            isError: true
        };
    }
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Pressable MCP Server running on stdio');
}

main().catch((error) => {
    console.error('Fatal error in main():', error);
    process.exit(1);
});
