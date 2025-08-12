import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import DButton from "discourse/components/d-button";

/**
 * Student Verification Alert Banner Component
 * 
 * This Glimmer component creates the alert banner with styling and dismissal functionality.
 * Uses modern Discourse component patterns and APIs.
 */

export default class StudentVerificationAlertBanner extends Component {
  @service siteSettings;

  /**
   * Get the alert message from site settings
   */
  get message() {
    return this.siteSettings.student_verification_alert_message ||
           "Verify before you start posting as student, please click <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMUMxMS44NjYgMSAxNSA0LjEzNCAxNSA4QzE1IDExLjg2NiAxMS44NjYgMTUgOCAxNUM0LjEzNCAxNSAxIDExLjg2NiAxIDhDMSA0LjEzNCA0LjEzNCA1IDggMVoiIHN0cm9rZT0iIzAwNjZjYyIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik02IDhMNy41IDkuNUwxMCA2LjUiIHN0cm9rZT0iIzAwNjZjYyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+' alt='verify' style='display: inline; width: 16px; height: 16px; margin: 0 4px; vertical-align: middle;'> in the header.";
  }

  /**
   * Get styling properties from site settings
   */
  get bannerStyle() {
    const settings = this.siteSettings;
    return {
      backgroundColor: settings.student_verification_alert_background_color || "#e6f0ff",
      borderColor: settings.student_verification_alert_border_color || "#b3d9ff",
      color: settings.student_verification_alert_text_color || "#0066cc"
    };
  }

  get closeButtonStyle() {
    const settings = this.siteSettings;
    return {
      color: settings.student_verification_alert_close_button_color || "#0066cc"
    };
  }

  /**
   * Handle the alert dismissal
   */
  @action
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
  }

  <template>
    <div 
      class="student-verification-alert"
      style="background-color: {{this.bannerStyle.backgroundColor}}; border-color: {{this.bannerStyle.borderColor}}; color: {{this.bannerStyle.color}};"
    >
      <div class="alert-message">
        {{{this.message}}}
      </div>
      <DButton
        @action={{this.dismissAlert}}
        @title="Dismiss alert"
        @ariaLabel="Dismiss alert"
        class="close-button btn-transparent"
        style="color: {{this.closeButtonStyle.color}};"
      >
        ×
      </DButton>
    </div>

    <style>
      .student-verification-alert {
        position: relative;
        width: 100%;
        padding: 12px 20px;
        margin: 0 0 10px 0;
        border: 1px solid;
        border-radius: 4px;
        font-size: 14px;
        line-height: 1.4;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
      }

      .student-verification-alert .alert-message {
        flex: 1;
        margin-right: 15px;
        font-weight: 500;
      }

      .student-verification-alert .close-button {
        background: none !important;
        border: none !important;
        font-size: 18px !important;
        font-weight: bold;
        cursor: pointer;
        padding: 0 !important;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease;
        min-height: auto !important;
      }

      .student-verification-alert .close-button:hover {
        background-color: rgba(0, 0, 0, 0.1) !important;
      }

      .student-verification-alert .close-button:focus {
        outline: 2px solid rgba(0, 102, 204, 0.5);
        outline-offset: 2px;
      }

      @media (max-width: 768px) {
        .student-verification-alert {
          padding: 10px 15px;
          font-size: 13px;
        }

        .student-verification-alert .alert-message {
          margin-right: 10px;
        }

        .student-verification-alert .close-button {
          width: 20px;
          height: 20px;
          font-size: 16px !important;
        }
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

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
    </style>
  </template>
}
