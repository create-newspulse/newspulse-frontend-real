const fetchHeadlines = async () => {
  try {
    const response = await fetch('/api/headlines');
    if (!response.ok) throw new Error('Failed to fetch headlines');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch headlines:', error);
    return [];
  }
};
