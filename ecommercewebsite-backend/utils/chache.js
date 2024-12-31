
const asyncHandler = require('./asyncHandler');

import { client } from '../src/app.js'

const Cache = async (key) => {
  try {
    // Attempt to get data from Redis
    const data = await asyncHandler(client.get.bind(client, key));

    if (data) {
      return JSON.parse(data);
    } else {
      const fetchedData = { name: 'Sample Data', value: 42 };

      client.setex(key, 3600, JSON.stringify(fetchedData));

      return fetchedData;
    }
  } catch (err) {
    throw new Error(`Error in caching data: ${err.message}`);
  }
};

module.exports = Cache;
