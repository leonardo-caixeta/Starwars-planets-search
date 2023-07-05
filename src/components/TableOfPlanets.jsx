import { useEffect, useState } from 'react';

async function TableOfPlanets() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const apiData = await fetch('https://swapi.dev/api/planets')
      .then((res) => res.json());
    setData(apiData);
  };
  useEffect(() => {
    getData();
    console.log(data);
  }, []);
  return (
    <p>nada</p>
  );
}

export default TableOfPlanets;
