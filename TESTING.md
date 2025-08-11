# Testing Guide for Discourse Student Verification Alert Plugin

This guide provides instructions for testing the plugin functionality.

## Prerequisites

1. A working Discourse development environment
2. Admin access to the Discourse instance
3. Ability to create and manage user groups

## Setup for Testing

### 1. Create Required Groups

In your Discourse admin panel, create the following groups:

1. **unverified_users**
   - Go to Admin > Groups > New Group
   - Name: `unverified_users`
   - Add some test users to this group

2. **grace_period_users**
   - Go to Admin > Groups > New Group
   - Name: `grace_period_users`
   - Add some test users to this group

3. **verified_students**
   - Go to Admin > Groups > New Group
   - Name: `verified_students`
   - Add some test users to this group

### 2. Install the Plugin

1. Copy the plugin directory to your Discourse `plugins` folder
2. Restart Discourse: `./launcher restart app` (for Docker) or restart your development server
3. Verify the plugin appears in Admin > Plugins

### 3. Configure Plugin Settings

1. Go to Admin > Settings > Plugins
2. Find "Student Verification Alert" settings
3. Ensure "Enable student verification alert banner" is checked
4. Customize other settings as needed:
   - Message text
   - Colors (background, border, text, close button)

## Test Cases

### Test Case 1: Banner Display for Unverified Users

**Steps:**
1. Log in as a user who is in the `unverified_users` group
2. Navigate to any page on the site

**Expected Result:**
- Banner should appear above the site header
- Banner should display the configured message
- Banner should use the configured colors
- Close button (×) should be visible

### Test Case 2: Banner Display for Grace Period Users

**Steps:**
1. Log in as a user who is in the `grace_period_users` group
2. Navigate to any page on the site

**Expected Result:**
- Banner should appear above the site header
- Same behavior as Test Case 1

### Test Case 3: No Banner for Verified Students

**Steps:**
1. Log in as a user who is in the `verified_students` group
2. Navigate to any page on the site

**Expected Result:**
- No banner should appear
- Site should function normally

### Test Case 4: No Banner for Users in Both Groups

**Steps:**
1. Add a user to both `unverified_users` AND `verified_students` groups
2. Log in as that user
3. Navigate to any page

**Expected Result:**
- No banner should appear (verified_students takes precedence)

### Test Case 5: Banner Dismissal

**Steps:**
1. Log in as a user who should see the banner
2. Click the × (close) button on the banner

**Expected Result:**
- Banner should slide up and disappear with animation
- Banner should not reappear when navigating to other pages
- Banner should not reappear when refreshing the page

### Test Case 6: Banner Reappears After New Session

**Steps:**
1. Complete Test Case 5 (dismiss the banner)
2. Log out completely
3. Log back in as the same user

**Expected Result:**
- Banner should appear again (dismissal is per-session)

### Test Case 7: Plugin Disabled

**Steps:**
1. Go to Admin > Settings > Plugins
2. Uncheck "Enable student verification alert banner"
3. Log in as a user who would normally see the banner

**Expected Result:**
- No banner should appear for any user

### Test Case 8: Custom Styling

**Steps:**
1. Go to Admin > Settings > Plugins
2. Change the banner colors:
   - Background color: `#ffeeee`
   - Border color: `#ffcccc`
   - Text color: `#cc0000`
   - Close button color: `#cc0000`
3. Log in as a user who should see the banner

**Expected Result:**
- Banner should appear with the new colors
- All color changes should be applied correctly

### Test Case 9: Custom Message

**Steps:**
1. Go to Admin > Settings > Plugins
2. Change the message to: "Please complete your student verification process"
3. Log in as a user who should see the banner

**Expected Result:**
- Banner should display the new message

### Test Case 10: Mobile Responsiveness

**Steps:**
1. Log in as a user who should see the banner
2. View the site on a mobile device or use browser dev tools to simulate mobile

**Expected Result:**
- Banner should display properly on mobile
- Text should be readable
- Close button should be easily tappable

## Debugging

### Check Browser Console

If the banner isn't appearing:
1. Open browser developer tools (F12)
2. Check the Console tab for JavaScript errors
3. Look for any error messages related to the plugin

### Check Plugin Loading

1. Go to Admin > Plugins
2. Verify the plugin is listed and enabled
3. Check that all settings are available

### Check Group Membership

1. Go to Admin > Users
2. Find the test user
3. Check their group memberships in their profile

### Check Session Storage

1. Open browser developer tools (F12)
2. Go to Application/Storage tab
3. Check Session Storage for `student_verification_alert_dismissed` key

## Common Issues

1. **Banner not showing**: Check group membership and plugin enabled status
2. **Styling not applied**: Verify color values are valid hex codes
3. **Close button not working**: Check browser console for JavaScript errors
4. **Settings not saving**: Restart Discourse after making changes

## Performance Testing

1. Test with multiple users simultaneously
2. Check page load times with the plugin enabled vs disabled
3. Verify no memory leaks with repeated banner dismissals
