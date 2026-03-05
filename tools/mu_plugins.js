const api = require('../api');

const muPluginTools = [
    {
        name: 'pressable_list_mu_plugins',
        description: 'Get a list of must-use (MU) plugins for your account/sites.',
        inputSchema: {
            type: 'object',
            properties: {
                page: { type: 'integer' },
                per_page: { type: 'integer' }
            }
        },
        handler: async (args) => {
            return await api.get('/mu-plugins', args);
        }
    },
    {
        name: 'pressable_get_mu_plugin',
        description: 'Get details for a specific MU plugin.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'integer' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.get(`/mu-plugins/${args.id}`);
        }
    }
];

module.exports = muPluginTools;
