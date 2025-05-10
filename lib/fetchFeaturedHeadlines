const fetchFeaturedHeadlines = async (selectedCategory, pageNum) => {
  setIsLoading(true);
  try {
    const url = selectedCategory
      ? `/api/headlines?category=${selectedCategory}&page=${pageNum}`
      : `/api/headlines?page=${pageNum}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch featured headlines: ${response.statusText}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format: Expected an array of headlines');
    }
    if (pageNum === 1) {
      setFeaturedHeadlines(data);
    } else {
      setFeaturedHeadlines((prev) => [...prev, ...data]);
    }
    setHasMore(data.length === 10);
  } catch (error) {
    console.error('Error fetching featured headlines:', error.message);
    setFeaturedHeadlines([]); // Reset on error
    setHasMore(false);
  } finally {
    setIsLoading(false);
  }
};
