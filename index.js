import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const MAX_CACHE_SIZE = process.env.MAX_CACHE_SIZE || 10;

const cache = new Map();

app.post("/cache", (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) {
    return res.status(400).json({ error: "Key and value are required." });
  }

  if (cache.has(key)) {
    return res.status(400).json({ error: "Key already exists in cache." });
  }

  if (cache.size >= MAX_CACHE_SIZE) {
    return res
      .status(400)
      .json({ error: "Cache is full. Cannot add more items." });
  }

  cache.set(key, value);
  return res
    .status(200)
    .json({ message: "Item added to cache successfully.", key, value });
});

app.get("/cache/:key", (req, res) => {
  const key = req.params.key;
  if (!cache.has(key)) {
    return res.status(404).json({ error: "Key not found in cache." });
  }
  return res.status(200).json({ key, value: cache.get(key) });
});

app.delete("/cache/:key", (req, res) => {
  const key = req.params.key;
  if (!cache.has(key)) {
    return res.status(404).json({ error: "Key not found in cache." });
  }
  cache.delete(key);
  return res.status(200).json({ message: "Key removed from cache." });
});

app.delete("/cache/key", (req, res) => {
  cache.clear();
  return res.status(200).json({ message: "All cache items cleared." });
});

app.get("/cache", (req, res) => {
    const allCache = Array.from(cache.entries()).map(([key, value]) => ({
      key,
      value,
    }));
  
    return res.status(200).json({ cache: allCache });
  });

  app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome to cache API." });
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port", process.env.PORT || 3000);
});
