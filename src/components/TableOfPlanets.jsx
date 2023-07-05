import { useEffect, useState } from 'react';
import apiFetch from '../funcs/Fetch';

function TableOfPlanets() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiData = apiFetch();
    setData(apiData);
  }, []);

  return (
    <p>nada</p>
  );
}

export default TableOfPlanets;
