const api = require('../api');

const bookmarkTools = [
    {
        name: 'pressable_list_bash_bookmarks',
        description: 'Get a list of Bash command bookmarks for your account.',
        inputSchema: {
            type: 'object',
            properties: {
                search: { type: 'string', description: 'Search term for name or command' },
                per_page: { type: 'integer' },
                page: { type: 'integer' }
            }
        },
        handler: async (args) => {
            return await api.get('/bash_command_bookmarks', args);
        }
    },
    {
        name: 'pressable_create_bash_bookmark',
        description: 'Create a new Bash/WP-CLI command bookmark.',
        inputSchema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                command: { type: 'string' },
                command_type: { type: 'string', enum: ['bash', 'wp_cli'] }
            },
            required: ['name', 'command', 'command_type']
        },
        handler: async (args) => {
            return await api.post('/bash_command_bookmarks', { bash_command_bookmark: args });
        }
    },
    {
        name: 'pressable_get_bash_bookmark',
        description: 'Get a specific Bash command bookmark by ID.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'integer' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.get(`/bash_command_bookmarks/${args.id}`);
        }
    }
];

module.exports = bookmarkTools;
