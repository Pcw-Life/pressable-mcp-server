const { Server } = require('@modelcontextprotocol/sdk/server');
const { WebStandardStreamableHTTPServerTransport } = require('@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const api = require('./api');

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
const bookmarkTools = require('./tools/bookmarks');
const muPluginTools = require('./tools/mu_plugins');
const securityTools = require('./tools/security');

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
    ...collaboratorTools,
    ...bookmarkTools,
    ...muPluginTools,
    ...securityTools
];

function createServer() {
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

    return server;
}

module.exports = {
    async fetch(request, env) {
        // Initialize API with Cloudflare env
        api.setEnv(env);

        const url = new URL(request.url);
        if (url.pathname === '/' || url.pathname === '/sse') {
            const transport = new WebStandardStreamableHTTPServerTransport();
            const server = createServer();
            await server.connect(transport);
            return transport.handleRequest(request);
        }

        return new Response('Not Found', { status: 404 });
    }
};
