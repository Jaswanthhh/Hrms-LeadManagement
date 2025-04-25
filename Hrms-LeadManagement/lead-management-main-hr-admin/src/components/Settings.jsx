import { useState } from "react";
import { Navbar } from "./Navbar";

const Settings = () => {
  const [settings, setSettings] = useState({
    language: "English",
    twoFactorAuth: true,
    mobilePushNotifications: true,
    desktopNotifications: true,
    emailNotifications: true
  });

  const handleSettingChange = async (setting, value) => {
    try {
      const updatedSettings = {
        ...settings,
        [setting]: value
      };
      setSettings(updatedSettings);
      console.log('Setting updated:', setting, value);
    } catch (err) {
      console.error('Error updating setting:', err);
      setSettings(prev => ({
        ...prev,
        [setting]: !value
      }));
      alert('Failed to update setting. Please try again.');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Navbar heading="Settings" />
      </div>

      {/* Main Content Box */}
      <div className="">
        <div className="border border-gray-200 rounded-lg bg-white">
          <div className="p-6">
            {/* Language Selection */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg mr-12 font-medium">Language</h3>
                <p className="text-gray-500 text-sm mt-1">Select your language</p>
              </div>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="bg-gray-100 rounded-md px-4 py-2 w-[150px]"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div className="border-t border-gray-200"></div>

            {/* Two-factor Authentication */}
            <div className="flex items-center justify-between py-6">
              <div>
                <h3 className="text-lg mr-[115px] font-medium">Two-factor Authentication</h3>
                <p className="text-gray-500 text-sm mt-1">Keep your account secure by enabling 2FA via mail</p>
              </div>
              <Toggle 
                enabled={settings.twoFactorAuth} 
                onChange={() => handleSettingChange('twoFactorAuth', !settings.twoFactorAuth)} 
              />
            </div>
            <div className="border-t border-gray-200"></div>

            {/* Mobile Push Notifications */}
            <div className="flex items-center justify-between py-6">
              <div>
                <h3 className="text-lg font-medium">Mobile Push Notifications</h3>
                <p className="text-gray-500 mr-[40px] text-sm mt-1">Receive push notification</p>
              </div>
              <Toggle 
                enabled={settings.mobilePushNotifications} 
                onChange={() => handleSettingChange('mobilePushNotifications', !settings.mobilePushNotifications)} 
              />
            </div>
            <div className="border-t border-gray-200"></div>

            {/* Desktop Notifications */}
            <div className="flex items-center justify-between py-6">
              <div>
                <h3 className="text-lg mr-12 font-medium">Desktop Notification</h3>
                <p className="text-gray-500 text-sm mt-1">Receive push notification in desktop</p>
              </div>
              <Toggle 
                enabled={settings.desktopNotifications} 
                onChange={() => handleSettingChange('desktopNotifications', !settings.desktopNotifications)} 
              />
            </div>
            <div className="border-t border-gray-200"></div>

            {/* Email Notifications */}
            <div className="flex items-center justify-between py-6">
              <div>
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <p className="text-gray-500 text-sm mt-1">Receive email notification</p>
              </div>
              <Toggle 
                enabled={settings.emailNotifications} 
                onChange={() => handleSettingChange('emailNotifications', !settings.emailNotifications)} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toggle component
const Toggle = ({ enabled, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={enabled}
      onChange={onChange}
      className="sr-only peer"
    />
    <div
      className={`w-10 h-5 rounded-full transition-colors duration-300 ${
        enabled ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      ></div>
    </div>
  </label>
);

export default Settings;