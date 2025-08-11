import { withPluginApi } from "discourse/lib/plugin-api";

/**
 * Student Verification Alert Plugin
 * 
 * This plugin displays an alert banner above the site header for users who belong to
 * specific groups (unverified_users or grace_period_users) but not to verified_students.
 * The banner can be dismissed and will remain hidden until the next login.
 */

export default {
  name: "student-verification-alert",
  
  initialize() {
    withPluginApi("0.8.31", (api) => {
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
      if (!shouldShowAlert(currentUser)) {
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
  },
};

/**
 * Determines if the alert should be shown based on user's group membership
 * @param {Object} currentUser - The current logged-in user object
 * @returns {boolean} - True if alert should be shown, false otherwise
 */
function shouldShowAlert(currentUser) {
  if (!currentUser.groups || !Array.isArray(currentUser.groups)) {
    return false;
  }

  const userGroupNames = currentUser.groups.map(group => group.name.toLowerCase());
  
  // Don't show to verified students
  if (userGroupNames.includes("verified_students")) {
    return false;
  }
  
  // Show to unverified_users or grace_period_users
  return userGroupNames.includes("unverified_users") || 
         userGroupNames.includes("grace_period_users");
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
