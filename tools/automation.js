const api = require('../api');

const automationTools = [
    {
        name: 'pressable_run_wp_cli',
        description: 'Run WP-CLI commands on a specific site. Commands are prefixed with "wp" automatically.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                commands: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'List of WP-CLI commands (e.g., ["plugin list", "cache flush"])'
                }
            },
            required: ['id', 'commands']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.id}/wordpress/wpcli`, { commands: args.commands });
        }
    },
    {
        name: 'pressable_run_bash_commands',
        description: 'Run Bash commands on a specific site.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                commands: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'List of Bash commands'
                }
            },
            required: ['id', 'commands']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.id}/wordpress/commands`, { commands: args.commands });
        }
    },
    {
        name: 'pressable_list_cron_jobs',
        description: 'Get a list of cron jobs for a specific site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.get(`/sites/${args.id}/cron_jobs`);
        }
    }
];

module.exports = automationTools;
