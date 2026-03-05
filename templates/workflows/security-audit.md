# Workflow: Routine Security Audit

Execute this audit monthly or after major updates.

1.  **Check Alerts**: Run `pressable_list_security_alerts` for both `plugin` and `theme`.
2.  **Audit Users**: Run `pressable_list_wp_users` for each site and look for suspicious accounts.
3.  **Update Plugins**: If vulnerabilities are found, use `pressable_run_wp_cli` with `["plugin update --all"]`.
4.  **Rotate Keys**: Use `pressable_reset_sftp_user_password` for any sensitive SFTP accounts.
5.  **Log Check**: Review `pressable_get_account_activity_logs` for unusual login patterns.
