const api = require('../api');

const siteTools = [
    {
        name: 'pressable_list_sites',
        description: 'Get a list of sites belonging to your account. Sites can be filtered by tag name or paginated.',
        inputSchema: {
            type: 'object',
            properties: {
                paginate: { type: 'boolean', description: 'Request a paginated response' },
                per_page: { type: 'integer', description: 'Amount of sites returned in a response' },
                page: { type: 'integer', description: 'Page of the response' },
                tag: { type: 'string', description: 'Filter sites by tag name' }
            }
        },
        handler: async (args) => {
            return await api.get('/sites', args);
        }
    },
    {
        name: 'pressable_get_site',
        description: 'Get details for a specific site by ID or name.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string', description: 'The site ID or site name' }
            },
            required: ['id']
        },
        handler: async (args) => {
            return await api.get(`/sites/${args.id}`);
        }
    },
    {
        name: 'pressable_create_site',
        description: 'Create a new WordPress site.',
        inputSchema: {
            type: 'object',
            properties: {
                name: { type: 'string', description: 'The name of the site' },
                datacenter: { type: 'string', description: 'Datacenter ID' },
                php_version: { type: 'string', description: 'PHP version (e.g., 8.1)' },
                install_option: { type: 'string', description: 'Install option (e.g., "none", "wp_latest")' }
            },
            required: ['name']
        },
        handler: async (args) => {
            return await api.post('/sites', args);
        }
    },
    {
        name: 'pressable_delete_site',
        description: 'Delete a specific site.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string', description: 'The site ID or name to delete' }
            },
            required: ['id']
        },
        handler: async (args) => {
            return await api.delete(`/sites/${args.id}`);
        }
    },
    {
        name: 'pressable_disable_site',
        description: 'Disable a specific site.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string', description: 'The site ID or name' }
            },
            required: ['id']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.id}/disable`);
        }
    },
    {
        name: 'pressable_enable_site',
        description: 'Enable a specific site.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string', description: 'The site ID or name' }
            },
            required: ['id']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.id}/enable`);
        }
    }
];

module.exports = siteTools;
