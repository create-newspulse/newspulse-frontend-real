import { useState, useEffect } from 'react';

export default function usePreferences() {
  const [preferences, setPreferences] = useState({
    preferredCategories: [],
    preferredLanguage: 'english',
  });

  useEffect(() => {
    // Load preferences from local storage
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const updatePreferences = (newPreferences) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...newPreferences };
      localStorage.setItem('userPreferences', JSON.stringify(updated));
      return updated;
    });
  };

  return [preferences, updatePreferences];
}
