const api = require('../api');

const collaboratorTools = [
    {
        name: 'pressable_list_collaborators',
        description: 'List all collaborators for an account or specific site.',
        inputSchema: {
            type: 'object',
            properties: {
                site_id: { type: 'string', description: 'Optional site ID to filter by' }
            }
        },
        handler: async (args) => {
            const path = args.site_id ? `/sites/${args.site_id}/collaborators` : '/collaborators';
            return await api.get(path);
        }
    },
    {
        name: 'pressable_add_collaborator',
        description: 'Add a collaborator to a site.',
        inputSchema: {
            type: 'object',
            properties: {
                site_id: { type: 'string' },
                email: { type: 'string' }
            },
            required: ['site_id', 'email']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.site_id}/collaborators`, { email: args.email });
        }
    }
];

module.exports = collaboratorTools;
