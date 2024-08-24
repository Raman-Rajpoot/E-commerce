
const asyncHandler = require('./asyncHandler');

import { client } from '../src/app.js'

// Utility function to handle caching
const Cache = async (key) => {
  try {
    // Attempt to get data from Redis
    const data = await asyncHandler(client.get.bind(client, key));

    if (data) {
      // If data exists in cache
      return JSON.parse(data);
    } else {
      // Simulate fetching data from a primary data source (e.g., database)
      const fetchedData = { name: 'Sample Data', value: 42 };

      // Store data in Redis with an expiration time (e.g., 3600 seconds)
      client.setex(key, 3600, JSON.stringify(fetchedData));

      return fetchedData;
    }
  } catch (err) {
    // Handle errors thrown during Redis operations
    throw new Error(`Error in caching data: ${err.message}`);
  }
};

module.exports = Cache;
