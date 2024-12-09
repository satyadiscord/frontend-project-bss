import { useState, useEffect } from "react";
import axios from "axios";

export default function FetchMapelApi(urls) {
  const [dataMapel, setDataMapel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get(urls);
        setDataMapel(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [urls]);

  return { dataMapel, setDataMapel, isLoading };
}
