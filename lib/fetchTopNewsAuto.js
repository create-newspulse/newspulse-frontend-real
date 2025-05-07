const API_KEYS = [
    process.env.API_KEY1,
    process.env.NEWSDATA_API_KEY,
    process.env.API_KEY2,
    process.env.API_KEY3,
    process.env.API_KEY4
  ];
  
  let currentKeyIndex = 0;
  
  export async function fetchTopNewsWithAutoKey(category = 'top') {
    let response;
    let data;
  
    while (currentKeyIndex < API_KEYS.length) {
      const apiKey = API_KEYS[currentKeyIndex];
      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&category=${category}&language=en`;
  
      try {
        response = await fetch(url);
        data = await response.json();
  
        if (data?.results?.length > 0) {
          return data.results.map(article => ({
            title: article.title,
            description: article.description,
            url: article.link,
            urlToImage: article.image_url || '/fallback.jpg'
          }));
        } else {
          currentKeyIndex++; // Try next key
        }
      } catch (err) {
        currentKeyIndex++; // On error, move to next key
      }
    }
  
    return []; // If all keys fail, return empty
  }
  
