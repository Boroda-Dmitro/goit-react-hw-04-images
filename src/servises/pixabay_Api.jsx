import axios from 'axios';

export const fetchImages = async (q, page = 1) => {
  const URL = 'https://pixabay.com/api/';
  const KEY = '34143834-71f54a932c118a9a307ce5c6b';

  const options = new URLSearchParams({
    key: KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 12,
  });
  try {
    const imagesArr = await axios.get(`${URL}?${options}`);
    return { Arr: imagesArr.data.hits, total: imagesArr.data.totalHits };
  } catch (error) {
    console.log(error);
  }
};
