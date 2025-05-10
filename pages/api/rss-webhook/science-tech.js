// pages/api/rss-webhook/science-tech.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const newItem = req.body;
    // ✅ Save to MongoDB or trigger frontend update
    console.log("New Science & Tech article:", newItem.title);
    res.status(200).json({ status: 'Received' });
  } else {
    res.status(405).end();
  }
}
