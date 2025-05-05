// lib/gtag.js

export const GA_TRACKING_ID = 'G-9YPR93WVX4'; // ✅ Use your own GA ID

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
