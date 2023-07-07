import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import fetchContext from './FetchContext';

export default function FetchProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((api) => api.json())
      .then(({ results }) => setData(results));
  }, []);

  return (
    <fetchContext.Provider value={ { data } }>
      { children }
    </fetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
