const api = require('../api');

const serverTools = [
    {
        name: 'pressable_get_sftp_users',
        description: 'Get a list of SFTP users for a specific site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.get(`/sites/${args.id}/sftp-users`);
        }
    },
    {
        name: 'pressable_get_php_error_logs',
        description: 'Get PHP error logs for a site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.get(`/sites/${args.id}/php-error-logs`);
        }
    },
    {
        name: 'pressable_set_php_version',
        description: 'Set the PHP version for a specific site.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                php_version: { type: 'string', enum: ['8.0', '8.1', '8.2', '8.3'] }
            },
            required: ['id', 'php_version']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.id}/php-version`, { php_version: args.php_version });
        }
    },
    {
        name: 'pressable_reset_sftp_user_password',
        description: 'Reset the password for a specific SFTP user.',
        inputSchema: {
            type: 'object',
            properties: {
                site_id: { type: 'string' },
                username: { type: 'string' }
            },
            required: ['site_id', 'username']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.site_id}/sftp-users/${args.username}/reset-password`);
        }
    }
];

module.exports = serverTools;
