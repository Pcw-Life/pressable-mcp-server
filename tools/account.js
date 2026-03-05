const api = require('../api');

const accountTools = [
    {
        name: 'pressable_get_account_details',
        description: 'Retrieve account profile and settings information.',
        inputSchema: { type: 'object', properties: {} },
        handler: async () => {
            return await api.get('/account');
        }
    },
    {
        name: 'pressable_get_account_activity_logs',
        description: 'Retrieve activity logs for the account.',
        inputSchema: {
            type: 'object',
            properties: {
                page: { type: 'integer' },
                per_page: { type: 'integer' }
            }
        },
        handler: async (args) => {
            return await api.get('/account/activity_logs', args);
        }
    }
];

module.exports = accountTools;
