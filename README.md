# Discourse Student Verification Alert Plugin

A Discourse plugin that displays an information alert banner above the navbar for logged-in users.

## Features

- **Default Visibility**: Shows alert to all logged-in users by default
- **Group-Based Targeting**: Admin can configure which specific groups should see the alert
- **Flexible Configuration**: Supports multiple groups via pipe-separated list
- **Customizable Styling**: Admin-configurable colors, text, and appearance
- **Dismissible**: Users can close the banner, and it stays hidden until next login
- **Responsive Design**: Works on both desktop and mobile devices
- **Smooth Animations**: Includes slide-down appearance and slide-up dismissal animations

## Installation

1. Copy this plugin directory to your Discourse `plugins` folder
2. Restart your Discourse instance
3. Enable the plugin in Admin > Plugins
4. Configure settings in Admin > Settings > Plugins

## Configuration

The plugin adds the following settings to your Discourse admin panel under **Admin > Settings > Plugins**:

### Settings

- **Enable student verification alert banner**: Turn the plugin on/off
- **Groups that should see the alert**: Specify which groups should see the banner (pipe-separated list, e.g., 'unverified_users|grace_period_users'). If left empty, shows to all logged-in users.
- **Alert message text**: Customize the message shown to users (default: "Verify before you start posting as student")
- **Background color**: Set the banner background color (default: #e6f0ff)
- **Border color**: Set the banner border color (default: #b3d9ff)
- **Text color**: Set the banner text color (default: #0066cc)
- **Close button color**: Set the close button color (default: #0066cc)

### Group Configuration

The plugin is flexible in its group targeting:

- **Default Behavior**: Shows alert to all logged-in users if no groups are specified
- **Group-Based Targeting**: Configure specific groups in the "Groups that should see the alert" setting
- **Multiple Groups**: Use pipe-separated format (e.g., `unverified_users|grace_period_users|new_members`)
- **Dynamic**: Groups can be added or removed without code changes

## How It Works

1. **User Login**: When a user logs in, the plugin checks if they should see the alert
2. **Group Check**:
   - If no groups are configured: Show to all logged-in users
   - If groups are configured: Show only to users in the specified groups
3. **Display**: Banner appears above the site header with customizable styling
4. **Dismissal**: User can click the × button to dismiss the banner
5. **Session Storage**: Dismissal state is stored until next login/session

## Technical Details

### File Structure
```
discourse-student-verification-alert/
├── plugin.rb                                    # Main plugin manifest
├── config/
│   ├── settings.yml                            # Plugin settings definition
│   └── locales/
│       └── server.en.yml                       # English translations
├── assets/
│   ├── javascripts/
│   │   └── discourse/
│   │       ├── initializers/
│   │       │   └── student-verification-alert.js    # Main plugin logic
│   │       └── widgets/
│   │           └── student-verification-alert-banner.js  # Banner widget
│   └── stylesheets/
│       └── student-verification-alert.scss     # Banner styling
└── README.md                                   # This file
```

### Plugin Outlets Used

- `above-site-header`: Used to position the banner above the main Discourse header

### Browser Compatibility

- Uses `sessionStorage` for dismissal state (falls back gracefully if unavailable)
- CSS animations with fallbacks
- Modern JavaScript (ES6+) - requires Discourse 2.7.0+

## Customization

### Styling
The banner styling can be customized through the admin settings or by modifying the SCSS file for advanced customization.

### Message Content
The alert message supports plain text. For HTML content, you would need to modify the widget code.

### Group Configuration
Configure which groups should see the alert through the admin settings. No code changes needed.

## Troubleshooting

### Banner Not Showing
1. Check that the plugin is enabled in Admin > Plugins
2. Verify the user is in the correct groups
3. Check that the user is not in the `verified_students` group
4. Clear browser cache and restart Discourse

### Settings Not Appearing
1. Ensure the plugin is properly installed and enabled
2. Check that all required files are present
3. Restart Discourse after installation

### Styling Issues
1. Check that the SCSS file is being loaded
2. Verify color values are valid hex codes
3. Clear browser cache

## Version History

- **2.0.0**: Major update with configurable group targeting and default visibility to all users
- **1.0.0**: Initial release with basic functionality

## License

This plugin is released under the same license as Discourse.

## Support

For issues and feature requests, please create an issue in the plugin repository.
