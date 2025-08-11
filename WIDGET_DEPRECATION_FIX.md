# Widget Deprecation Fix - Student Verification Alert Plugin

## Problem

The plugin was showing this error:
```
[PLUGIN discourse-student-verification-alert] decorateWidget: Could not find widget 'above-site-header' in registry
```

This occurred because Discourse has moved from the legacy widget system to modern Glimmer components, and the `above-site-header` widget no longer exists.

## Root Cause

- **Legacy Approach**: Plugin was using `api.decorateWidget("above-site-header")` 
- **Widget System**: The widget rendering system has been deprecated in favor of Glimmer components
- **Missing Widget**: The `above-site-header` widget was removed as part of Discourse's modernization

## Solution Applied

### 1. Updated Plugin Outlet
- **Before**: `above-site-header` (deprecated widget)
- **After**: `above-main-container` (modern plugin outlet)

### 2. Converted to Modern API
- **Before**: `api.decorateWidget("above-site-header", helper => helper.attach("widget-name"))`
- **After**: `api.renderInOutlet("above-main-container", ComponentClass)`

### 3. Created Glimmer Component
- **Removed**: `assets/javascripts/discourse/widgets/student-verification-alert-banner.js`
- **Added**: `assets/javascripts/discourse/components/student-verification-alert-banner.gjs`

### 4. Modernized Component Structure
- **Template**: Uses `<template>` syntax in `.gjs` file
- **Services**: Uses `@service siteSettings` injection
- **Actions**: Uses `@action` decorator
- **Styling**: Embedded CSS in component for better encapsulation

## Key Changes Made

### File Structure
```
Before:
├── assets/javascripts/discourse/widgets/student-verification-alert-banner.js
├── assets/stylesheets/student-verification-alert.scss
└── assets/javascripts/discourse/initializers/student-verification-alert.js

After:
├── assets/javascripts/discourse/components/student-verification-alert-banner.gjs
└── assets/javascripts/discourse/initializers/student-verification-alert.js
```

### Code Changes

**Initializer (student-verification-alert.js):**
```javascript
// Before
api.decorateWidget("above-site-header", (helper) => {
  return helper.attach("student-verification-alert-banner");
});

// After
api.renderInOutlet("above-main-container", StudentVerificationAlertBanner);
```

**Component Architecture:**
```javascript
// Before: Widget-based
export default createWidget("student-verification-alert-banner", {
  // widget code
});

// After: Glimmer Component
export default class StudentVerificationAlertBanner extends Component {
  @service siteSettings;
  @action dismissAlert() { /* ... */ }
  
  <template>
    <!-- component template -->
  </template>
}
```

## Benefits of the Fix

1. **Compatibility**: Works with current and future Discourse versions
2. **Performance**: Glimmer components are more efficient than widgets
3. **Maintainability**: Modern component patterns are easier to maintain
4. **Encapsulation**: Styles are embedded in the component
5. **Type Safety**: Better TypeScript support with modern patterns

## Testing

After applying this fix:
1. ✅ No more widget registry errors
2. ✅ Banner displays correctly above main content
3. ✅ All functionality preserved (dismissal, styling, group targeting)
4. ✅ Responsive design maintained
5. ✅ Admin settings continue to work

## Plugin Outlet Reference

For future reference, common plugin outlets for banners:
- `above-main-container`: Above the main content area (used by this plugin)
- `below-site-header`: Below the site header
- `above-footer`: Above the footer
- `topic-above-posts`: Above topic posts

## Compatibility

- **Minimum Discourse Version**: 2.7.0+ (unchanged)
- **Modern Discourse**: Fully compatible with latest versions
- **Glimmer Components**: Uses current best practices
- **Plugin API**: Uses modern `renderInOutlet` approach

This fix ensures the plugin will continue working as Discourse evolves and removes dependency on deprecated widget systems.
