//import Redis from 'redis';
import shortid from 'shortid';
import redisClient from './redis';



export default async function handler(req, res) {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'Pas d\'url associer' });
  }

  const id = shortid.generate();
  const shortUrl = `${process.env.BASE_URL}/${id}`;

  redisClient.set(id, url, (err) => {
    if (err) {
      console.error('Redis error:', err);
      return res.status(500).json({ error: 'Impossible de d\'ajouter une url racourci dans la base' });
    }

  });
  return res.status(200).json({ shortUrl });
}
