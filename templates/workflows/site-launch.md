# Workflow: Site Launch Checklist

Use this workflow when transitioning a site from development to live.

1.  **Add Domain**: Use `pressable_add_site_domain` to add the production domain.
2.  **Verify DNS**: Check `pressable_get_dns_records` for the zone.
3.  **Set Primary**: (Manual/API) Set the new domain as primary via the control panel or `pressable_update_site`.
4.  **Enable Edge Cache**: Use `pressable_toggle_edge_cache` with `enabled: true`.
5.  **Final Purge**: Use `pressable_purge_edge_cache` to ensure all content is fresh.
6.  **Benchmark**: Use `pressable_get_site_metrics` to record baseline performance.
