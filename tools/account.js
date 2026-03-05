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
    },
    {
        name: 'pressable_get_account_activity_log_actions',
        description: 'Get a list of all available activity log actions for the account.',
        inputSchema: { type: 'object', properties: {} },
        handler: async () => {
            return await api.get('/account/activity_logs/actions');
        }
    },
    {
        name: 'pressable_get_available_addons',
        description: 'Get a list of available account add-ons.',
        inputSchema: { type: 'object', properties: {} },
        handler: async () => {
            return await api.get('/account/add-ons/available');
        }
    },
    {
        name: 'pressable_get_account_addons',
        description: 'Get a list of add-ons attached to your account.',
        inputSchema: { type: 'object', properties: {} },
        handler: async () => {
            return await api.get('/account/add-ons');
        }
    }
];

module.exports = accountTools;
