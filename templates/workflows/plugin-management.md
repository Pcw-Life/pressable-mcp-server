# Workflow: Plugin & Theme Management

1.  **List Alerts**: Use `pressable_list_security_alerts` to find vulnerable extensions.
2.  **Bulk Update**: Use `pressable_run_wp_cli` with `["plugin update --all"]` or `["theme update --all"]`.
3.  **New Installations**: Use `pressable_install_plugin` or `pressable_install_theme` by slug or URL.
4.  **License Activation**: Follow up with `pressable_run_wp_cli` if the plugin requires a CLI-based license key entry (e.g., ACF, Gravity Forms).
5.  **Verify**: Use `pressable_list_plugins` to ensure the correct version is active.
