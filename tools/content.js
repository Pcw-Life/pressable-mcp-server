const api = require('../api');

const contentTools = [
    {
        name: 'pressable_list_plugins',
        description: 'Get a list of plugins for a specific site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.get(`/sites/${args.id}/plugins`);
        }
    },
    {
        name: 'pressable_install_plugin',
        description: 'Install and activate a plugin on a site.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                plugin_slug: { type: 'string', description: 'Slug of the plugin from WP.org' }
            },
            required: ['id', 'plugin_slug']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.id}/plugins`, { plugins: [args.plugin_slug] });
        }
    },
    {
        name: 'pressable_list_themes',
        description: 'Get a list of themes for a specific site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.get(`/sites/${args.id}/themes`);
        }
    }
];

module.exports = contentTools;
