# Changelog - Discourse Student Verification Alert Plugin

## Version 2.0.0 - Major Update

### 🔄 Breaking Changes

**Default Visibility Changed:**
- **Before**: Banner was shown only to users in specific groups (`unverified_users` or `grace_period_users`) and hidden from `verified_students`
- **After**: Banner is shown to ALL logged-in users by default, with optional group-based targeting

### ✨ New Features

**Enhanced Admin Configuration:**
- Added new setting: "Groups that should see the alert banner"
- Supports pipe-separated list format (e.g., `unverified_users|grace_period_users`)
- If left empty, shows to all logged-in users
- Flexible group targeting without code changes

**Modern Plugin API:**
- Updated from `withPluginApi` to `apiInitializer` (latest Discourse standard)
- Removed version requirement parameter (now handled by .discourse-compatibility)
- Improved code structure following 2024/2025 best practices

### 🔧 Technical Improvements

**Logic Changes:**
- Simplified group checking logic
- Better error handling for missing or empty group configurations
- More intuitive admin settings descriptions

**Code Quality:**
- Updated to latest Discourse plugin development patterns
- Improved documentation and comments
- Better separation of concerns

### 📚 Documentation Updates

**README.md:**
- Updated feature descriptions to reflect new behavior
- Revised configuration instructions
- Added examples for group configuration
- Updated "How It Works" section

**TESTING.md:**
- Added new test cases for default visibility
- Updated existing test cases for group-based targeting
- Added test for empty group configuration
- Renumbered test cases for clarity

### 🎯 Migration Guide

**For Existing Users:**

1. **Immediate Impact**: After upgrading, the banner will show to ALL logged-in users by default
2. **To Restore Previous Behavior**: 
   - Go to Admin > Settings > Plugins
   - Set "Groups that should see the alert" to: `unverified_users|grace_period_users`
3. **No Code Changes Required**: All customization is now done through admin settings

**New Installation:**
- Plugin works out-of-the-box showing banner to all users
- Configure groups as needed through admin settings
- No manual group creation required

### 🔍 Settings Reference

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `student_verification_alert_enabled` | Boolean | `true` | Enable/disable the plugin |
| `student_verification_alert_visible_groups` | List | `unverified_users\|grace_period_users` | Groups that should see the alert (pipe-separated) |
| `student_verification_alert_message` | String | "Verify before you start posting as student" | Alert message text |
| `student_verification_alert_background_color` | String | "#e6f0ff" | Banner background color |
| `student_verification_alert_border_color` | String | "#b3d9ff" | Banner border color |
| `student_verification_alert_text_color` | String | "#0066cc" | Banner text color |
| `student_verification_alert_close_button_color` | String | "#0066cc" | Close button color |

### 🧪 Testing

**New Test Scenarios:**
- Default behavior (show to all users)
- Single group targeting
- Multiple group targeting
- Empty group configuration
- Users not in configured groups

**Backward Compatibility:**
- All existing styling and dismissal functionality preserved
- Session storage behavior unchanged
- Admin settings interface enhanced but compatible

### 🚀 Deployment Notes

**Requirements:**
- Discourse 2.7.0 or higher (unchanged)
- No additional dependencies

**Installation:**
1. Replace plugin files
2. Restart Discourse
3. Configure group settings if needed
4. Test with different user types

**Rollback:**
- Keep backup of v1.0.0 if needed
- Settings will need to be reconfigured if rolling back

---

## Version 1.0.0 - Initial Release

### Features
- Basic banner display for specific groups
- Customizable styling through admin settings
- Dismissible banner with session storage
- Responsive design
- Widget-based implementation
