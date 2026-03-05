const api = require('../api');

const dnsTools = [
    {
        name: 'pressable_list_dns_zones',
        description: 'Get a list of all DNS zones.',
        inputSchema: { type: 'object', properties: {} },
        handler: async () => {
            return await api.get('/dns/zones');
        }
    },
    {
        name: 'pressable_get_dns_records',
        description: 'Get DNS records for a specific zone.',
        inputSchema: {
            type: 'object',
            properties: {
                zone_name: { type: 'string', description: 'The zone name/domain' }
            },
            required: ['zone_name']
        },
        handler: async (args) => {
            return await api.get(`/dns/zones/${args.zone_name}/records`);
        }
    },
    {
        name: 'pressable_create_dns_record',
        description: 'Create a new DNS record.',
        inputSchema: {
            type: 'object',
            properties: {
                zone_name: { type: 'string' },
                type: { type: 'string', enum: ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'SRV', 'NS'] },
                name: { type: 'string' },
                content: { type: 'string' },
                priority: { type: 'integer' },
                ttl: { type: 'integer' }
            },
            required: ['zone_name', 'type', 'name', 'content']
        },
        handler: async (args) => {
            const { zone_name, ...recordData } = args;
            return await api.post(`/dns/zones/${zone_name}/records`, recordData);
        }
    }
];

module.exports = dnsTools;
