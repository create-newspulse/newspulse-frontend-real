import { MongoClient } from 'mongodb';

const uri = 'YOUR_MONGODB_URI'; // Replace with your MongoDB Atlas URI
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db('newsPulse');
    const collection = db.collection('userInteractions');

    // Aggregate interactions to find the most engaged categories
    const interactions = await collection
      .aggregate([
        { $match: { action: 'click' } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ])
      .toArray();

    const topCategory = interactions.length > 0 ? interactions[0]._id : 'general';

    // Map categories to ad types (simplified for demo)
    const adTypes = {
      general: { type: 'banner', size: '728x90', priority: 'medium' },
      technology: { type: 'skyscraper', size: '160x600', priority: 'high' },
      sports: { type: 'banner', size: '728x90', priority: 'medium' },
      business: { type: 'rectangle', size: '300x250', priority: 'high' },
      entertainment: { type: 'banner', size: '728x90', priority: 'medium' },
      health: { type: 'rectangle', size: '300x250', priority: 'medium' },
      science: { type: 'skyscraper', size: '160x600', priority: 'high' },
    };

    const adConfig = adTypes[topCategory] || adTypes.general;

    res.status(200).json({ adConfig, topCategory });
  } catch (error) {
    console.error('Error optimizing ads:', error.message);
    res.status(500).json({ error: 'Failed to optimize ads', adConfig: { type: 'banner', size: '728x90', priority: 'medium' } });
  } finally {
    await client.close();
  }
}
