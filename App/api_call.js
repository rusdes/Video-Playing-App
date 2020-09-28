import axios from 'axios';

export const KEY = 'AIzaSyCvc57cWMF7AQivRVUC512KV5qCF7R7Fc4';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 10,
    key: KEY,
  },
});
