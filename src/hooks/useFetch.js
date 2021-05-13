import {useState, useEffect} from 'react';

//custom hook which helps to fetch data
const useFetch = (url, key) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          'X-Master-Key': key,
        },
      });
      const json = await response.json();
      setData(json.record);
    };

    fetchData();
  }, [url, key]);

  return data;
};

export default useFetch;
