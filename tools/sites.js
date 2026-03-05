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
    },
    {
        name: 'pressable_convert_site',
        description: 'Convert a site between staging and live, or to DupliKit/Sandbox.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                target_type: { type: 'string', enum: ['staging', 'live', 'duplikit', 'sandbox'] }
            },
            required: ['id', 'target_type']
        },
        handler: async (args) => {
            const endpoint = `/sites/${args.id}/convert-${args.target_type}`;
            return await api.post(endpoint);
        }
    },
    {
        name: 'pressable_flush_object_cache',
        description: 'Flush the object cache for a specific site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.id}/flush-object-cache`);
        }
    },
    {
        name: 'pressable_toggle_maintenance_mode',
        description: 'Toggle maintenance mode for a site.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                enabled: { type: 'boolean' }
            },
            required: ['id', 'enabled']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.id}/maintenance-mode`, { enabled: args.enabled });
        }
    },
    {
        name: 'pressable_reset_wp_admin_password',
        description: 'Reset the WordPress admin password for a site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.id}/reset-password`);
        }
    },
    {
        name: 'pressable_set_php_filesystem_permissions',
        description: 'Set PHP file system permissions for a site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.id}/php-permissions`);
        }
    },
    {
        name: 'pressable_update_site',
        description: 'Update settings for a specific site.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                php_version: { type: 'string' }
            },
            required: ['id']
        },
        handler: async (args) => {
            const { id, ...data } = args;
            return await api.put(`/sites/${id}`, data);
        }
    },
    {
        name: 'pressable_list_site_domains',
        description: 'Get a list of domains for a specific site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.get(`/sites/${args.id}/domains`);
        }
    },
    {
        name: 'pressable_add_site_domain',
        description: 'Add a domain to a site.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                domain: { type: 'string' }
            },
            required: ['id', 'domain']
        },
        handler: async (args) => {
            return await api.post(`/sites/${args.id}/domains`, { domain: args.domain });
        }
    },
    {
        name: 'pressable_get_phpmyadmin_url',
        description: 'Get a time-limited phpMyAdmin URL for a site.',
        inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        handler: async (args) => {
            return await api.get(`/sites/${args.id}/wordpress/phpmyadmin`);
        }
    }
];

module.exports = siteTools;
