import React from "react";

const SettingsLayout = ({ userRole, children }) => {
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <nav>
        <ul>
          <li>Profile</li>
          <li>Security</li>
          {userRole === "doctor" && <li>Appointment Preferences</li>}
        </ul>
      </nav>
      <div className="settings-content">
        {children} {/* Dynamic content goes here */}
      </div>
    </div>
  );
};

export default SettingsLayout;
