// lib/gtag.js

export const GA_TRACKING_ID = 'G-9YPR93VVX4';

// Log page views
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
