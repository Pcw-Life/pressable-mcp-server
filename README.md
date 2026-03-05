# Pressable MCP Server

An MCP server for the Pressable API, providing a comprehensive set of tools for management and automation of WordPress sites.

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

The server provides tools across 10 categories:
- **Account**: Get details, activity logs.
- **Sites**: List, Create, Get, Update, Delete, Disable, Enable.
- **DNS**: List zones, Get records, Create records.
- **Cache**: Status, Purge.
- **Content**: List plugins, Install plugins, List themes.
- **Server**: SFTP users, PHP versions, Logs.
- **Automation**: WP-CLI, Bash commands, Cron jobs.
- **Backups**: List, Create on-demand, Restore.
- **Usage**: Metrics, Storage/DB usage.
- **Collaborators**: List, Add.
