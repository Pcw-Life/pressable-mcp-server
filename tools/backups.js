const api = require('../api');

const backupTools = [
    {
        name: 'pressable_list_backups',
        description: 'Get a list of backups for a specific site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.get(`/sites/${args.id}/backups`);
        }
    },
    {
        name: 'pressable_create_on_demand_backup',
        description: 'Create an on-demand backup of a site.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                type: { type: 'string', enum: ['filesystem', 'database'] }
            },
            required: ['id', 'type']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.id}/on-demand-backups`, { type: args.type });
        }
    },
    {
        name: 'pressable_restore_site',
        description: 'Restore a site from a backup.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string', description: 'Site ID to restore' },
                filesystem_id: { type: 'integer' },
                database_id: { type: 'integer' },
                restore_on_site_id: { type: 'integer', description: 'Optional ID of site to restore onto' }
            },
            required: ['id']
        },
        handler: async (args) => {
            const { id, ...restoreData } = args;
            return await api.post(`/sites/${id}/restores`, restoreData);
        }
    }
];

module.exports = backupTools;
