# Pressable MCP Server

An MCP server for the Pressable API, providing a comprehensive set of tools for management and automation of WordPress sites.

## Features

- **56 Comprehensive Tools**: 100% coverage of the Pressable API v1.
- **Workflow Templates**: Preset guides for common tasks (Site Launch, Security Audit).
- **Preset Prompts**: High-signal prompts for AI agents.
- **Managed Authentication**: Auto-token retrieval and caching.

## Configuration

1.  Obtain your **Client ID** and **Client Secret** from [Pressable API Applications](https://my.pressable.com/api/applications).
2.  Create a `.env` file in the project directory:
    ```env
    PRESSABLE_CLIENT_ID=your_client_id
    PRESSABLE_CLIENT_SECRET=your_client_secret
    ```

## Usage

### In an MCP Client (e.g. Claude Desktop)

Add the following to your MCP settings file:

```json
{
  "mcpServers": {
    "pressable": {
      "command": "node",
      "args": ["/Users/pcw_admin/.gemini/antigravity/scratch/pressable-mcp-server/index.js"],
      "env": {
        "PRESSABLE_CLIENT_ID": "your_client_id",
        "PRESSABLE_CLIENT_SECRET": "your_client_secret"
      }
    }
  }
}
```

## Available Tools

The server is organized into 13 specialized modules:

1.  **Account**: Details, Activity Logs, Account Add-ons.
2.  **Sites**: Full lifecycle, Conversions, Domains, PHP Permissions, phpMyAdmin access.
3.  **DNS**: Zone management, Record CRUD, Email provider presets.
4.  **Edge Cache**: Status, Toggling, Purging, Defensive Mode.
5.  **Content**: Plugins, Themes, WordPress Users.
6.  **Server**: SFTP users, PHP versions, Logs, SFTP password resets.
7.  **Automation**: WP-CLI, Bash, Cron Jobs.
8.  **Backups**: On-demand snapshots, Restores, Downloads.
9.  **Usage**: Metrics, Filesystem/Database limits.
10. **Collaborators**: Site-level access management.
11. **Bookmarks**: Shared Bash/WP-CLI command presets.
12. **Must-Use Plugins**: Management of MU-Plugins.
13. **Security**: Centralized Plugin/Theme vulnerability alerts.

## Workflows & Templates

Check the `templates/` directory for:
- [Site Launch Checklist](templates/workflows/site-launch.md)
- [Security Audit Guide](templates/workflows/security-audit.md)
- [Plugin & Theme Management](templates/workflows/plugin-management.md)
- [Preset Prompts](templates/prompts/preset-prompts.md)
