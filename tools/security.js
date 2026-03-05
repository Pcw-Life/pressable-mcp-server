const api = require('../api');

const securityTools = [
    {
        name: 'pressable_list_security_alerts',
        description: 'Get security alerts for plugins and themes across all sites.',
        inputSchema: {
            type: 'object',
            properties: {
                type: { type: 'string', enum: ['plugin', 'theme'], description: 'Type of alerts to retrieve' }
            }
        },
        handler: async (args) => {
            const type = args.type || 'plugin';
            return await api.get(`/security-alerts/${type}s`);
        }
    }
];

module.exports = securityTools;
