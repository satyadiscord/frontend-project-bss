import { useState, useEffect } from "react";
import axios from "axios";

export default function FetchStudentApi(urls) {
  const [dataStudent, setDataStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get(urls);
        setDataStudent(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [urls]);

  return { dataStudent, setDataStudent, isLoading };
}
