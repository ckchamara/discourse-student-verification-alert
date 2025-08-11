# name: discourse-student-verification-alert
# about: Shows an information alert above the navbar for unverified student users
# version: 1.0.0
# authors: Discourse Plugin Developer
# url: https://github.com/yourusername/discourse-student-verification-alert
# required_version: 2.7.0

# Enable the plugin based on the main setting
enabled_site_setting :student_verification_alert_enabled

# Register plugin assets
register_asset "stylesheets/student-verification-alert.scss"

# After plugin initialization
after_initialize do
  # Plugin initialization code can go here if needed for server-side functionality
  # For now, this plugin is primarily client-side focused
end
