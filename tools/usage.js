const api = require('../api');

const usageTools = [
    {
        name: 'pressable_get_site_metrics',
        description: 'Get performance metrics for a specific site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.get(`/sites/${args.id}/metrics`);
        }
    },
    {
        name: 'pressable_get_site_usage',
        description: 'Get storage and resource usage for a specific site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.get(`/sites/${args.id}/usage`);
        }
    }
];

module.exports = usageTools;
