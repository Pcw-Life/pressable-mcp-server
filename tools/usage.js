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
    },
    {
        name: 'pressable_set_site_usage_limits',
        description: 'Set filesystem or database usage limits for a site.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                type: { type: 'string', enum: ['filesystem', 'database'] },
                limit: { type: 'integer', description: 'Limit in bytes' },
                warning_headroom: { type: 'integer', description: 'Warning headroom in bytes' }
            },
            required: ['id', 'type', 'limit']
        },
        handler: async (args) => {
            const { id, type, ...data } = args;
            return await api.put(`/sites/${id}/usage/${type}`, data);
        }
    }
];

module.exports = usageTools;
