import React from "react";
import SettingsLayout from "./SettingsLayout";

const PatientSettings = () => {
    return (
      <SettingsLayout userRole="patient">
        <h3>Patient Preferences</h3>
        <p>Manage personal details, medical history, etc.</p>
      </SettingsLayout>
    );
  };
  
  export default PatientSettings;
  