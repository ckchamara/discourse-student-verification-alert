import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";

/**
 * Student Verification Alert Banner Widget
 * 
 * This widget creates the actual banner HTML structure with styling
 * and handles the close button functionality.
 */

export default createWidget("student-verification-alert-banner", {
  tagName: "div.student-verification-alert",
  
  buildKey: () => "student-verification-alert-banner",

  /**
   * Build the HTML structure for the alert banner
   */
  html() {
    const siteSettings = this.siteSettings;
    
    // Get the alert message from site settings
    const message = siteSettings.student_verification_alert_message || 
                   "Verify before you start posting as student";

    return [
      h("div.alert-message", message),
      h("button.close-button", {
        onclick: () => this.dismissAlert(),
        title: "Dismiss alert",
        "aria-label": "Dismiss alert"
      }, "×")
    ];
  },

  /**
   * Apply custom styling based on site settings after the widget is rendered
   */
  didRenderWidget() {
    this.scheduleRerender();
    this.applyCustomStyling();
  },

  /**
   * Handle the alert dismissal
   */
  dismissAlert() {
    // Mark as dismissed in session storage
    try {
      sessionStorage.setItem("student_verification_alert_dismissed", "true");
    } catch (e) {
      console.warn("Could not save alert dismissal state");
    }

    // Remove the banner from the DOM with animation
    const banner = document.querySelector(".student-verification-alert");
    if (banner) {
      banner.style.animation = "slideUp 0.3s ease-out forwards";
      setTimeout(() => {
        if (banner.parentNode) {
          banner.parentNode.removeChild(banner);
        }
      }, 300);
    }
  },

  /**
   * Apply custom styling from site settings
   */
  applyCustomStyling() {
    const banner = document.querySelector(".student-verification-alert");
    if (!banner) return;

    const siteSettings = this.siteSettings;
    
    // Apply background color
    if (siteSettings.student_verification_alert_background_color) {
      banner.style.backgroundColor = siteSettings.student_verification_alert_background_color;
    }
    
    // Apply border color
    if (siteSettings.student_verification_alert_border_color) {
      banner.style.borderColor = siteSettings.student_verification_alert_border_color;
    }
    
    // Apply text color
    if (siteSettings.student_verification_alert_text_color) {
      banner.style.color = siteSettings.student_verification_alert_text_color;
    }
    
    // Apply close button color
    const closeButton = banner.querySelector(".close-button");
    if (closeButton && siteSettings.student_verification_alert_close_button_color) {
      closeButton.style.color = siteSettings.student_verification_alert_close_button_color;
    }

    // Add slide-up animation CSS if not already added
    if (!document.querySelector("#student-alert-animations")) {
      const style = document.createElement("style");
      style.id = "student-alert-animations";
      style.textContent = `
        @keyframes slideUp {
          from {
            opacity: 1;
            transform: translateY(0);
            max-height: 100px;
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
            padding: 0;
            margin: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
});
