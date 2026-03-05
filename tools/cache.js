const api = require('../api');

const cacheTools = [
    {
        name: 'pressable_get_edge_cache_status',
        description: 'Get the status of edge caching for a specific site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string', description: 'Site ID or name' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.get(`/sites/${args.id}/edge-cache`);
        }
    },
    {
        name: 'pressable_purge_edge_cache',
        description: 'Purge the edge cache for a specific site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string', description: 'Site ID or name' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.id}/edge-cache/purge`);
        }
    },
    {
        name: 'pressable_toggle_edge_cache',
        description: 'Enable or disable edge caching for a site.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                enabled: { type: 'boolean' }
            },
            required: ['id', 'enabled']
        },
        handler: async (args) => {
            const method = args.enabled ? 'enable' : 'disable';
            return await api.post(`/sites/${args.id}/edge-cache/${method}`);
        }
    },
    {
        name: 'pressable_toggle_edge_cache_defensive_mode',
        description: 'Toggle edge cache defensive mode for a site.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                enabled: { type: 'boolean' }
            },
            required: ['id', 'enabled']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.id}/edge-cache/defensive-mode`, { enabled: args.enabled });
        }
    }
];

module.exports = cacheTools;
