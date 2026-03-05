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
    }
];

module.exports = cacheTools;
