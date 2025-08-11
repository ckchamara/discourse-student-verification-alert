import { apiInitializer } from "discourse/lib/api";

/**
 * Student Verification Alert Plugin
 *
 * This plugin displays an alert banner above the site header for logged-in users.
 * By default, it shows to all logged-in users, but can be configured to show only
 * to users in specific groups. The banner can be dismissed and will remain hidden
 * until the next login.
 */

export default apiInitializer((api) => {
  // Check if the plugin is enabled
  if (!api.container.lookup("site-settings:main").student_verification_alert_enabled) {
    return;
  }

  // Get the current user
  const currentUser = api.getCurrentUser();

  // If no user is logged in, don't show the banner
  if (!currentUser) {
    return;
  }

  // Check if user should see the alert based on group membership
  if (!shouldShowAlert(currentUser, api.container.lookup("site-settings:main"))) {
    return;
  }

  // Check if the alert has been dismissed for this session
  if (isAlertDismissed()) {
    return;
  }

  // Add the banner to the above-site-header outlet
  api.decorateWidget("above-site-header", (helper) => {
    return helper.attach("student-verification-alert-banner");
  });
});

/**
 * Determines if the alert should be shown based on user's group membership
 * @param {Object} currentUser - The current logged-in user object
 * @param {Object} siteSettings - The site settings object
 * @returns {boolean} - True if alert should be shown, false otherwise
 */
function shouldShowAlert(currentUser, siteSettings) {
  // If no groups are configured, show to all logged-in users
  if (!siteSettings.student_verification_alert_visible_groups) {
    return true;
  }

  // If user has no groups, don't show the alert
  if (!currentUser.groups || !Array.isArray(currentUser.groups)) {
    return false;
  }

  // Get the configured visible groups from settings (pipe-separated list)
  const visibleGroups = siteSettings.student_verification_alert_visible_groups
    .split('|')
    .map(group => group.trim().toLowerCase())
    .filter(group => group.length > 0);

  // If no valid groups configured, show to all logged-in users
  if (visibleGroups.length === 0) {
    return true;
  }

  // Get user's group names
  const userGroupNames = currentUser.groups.map(group => group.name.toLowerCase());

  // Show alert only if user is in one of the configured visible groups
  return visibleGroups.some(visibleGroup => userGroupNames.includes(visibleGroup));
}

/**
 * Checks if the alert has been dismissed for this session
 * @returns {boolean} - True if dismissed, false otherwise
 */
function isAlertDismissed() {
  try {
    return sessionStorage.getItem("student_verification_alert_dismissed") === "true";
  } catch (e) {
    // Fallback if sessionStorage is not available
    return false;
  }
}

/**
 * Marks the alert as dismissed for this session
 */
function dismissAlert() {
  try {
    sessionStorage.setItem("student_verification_alert_dismissed", "true");
  } catch (e) {
    // Silently fail if sessionStorage is not available
    console.warn("Could not save alert dismissal state");
  }
}
