import React, { useContext, useMemo, useState } from 'react';
import fetchContext from '../context/FetchContext';

function TableOfPlanets() {
  const { data } = useContext(fetchContext);
  const [filterText, setFilterText] = useState('');

  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);
  const [filterResults, setFilterResults] = useState([]);

  const filterByName = useMemo(() => (
    data.filter((el) => el.name.toLowerCase()
      .includes(filterText.toLowerCase()))
  ), [data, filterText]);

  const numericFilter = () => {
    switch (filterComparison) {
    case 'maior que':
      setFilterResults(filterByName.filter((el) => (
        el[filterColumn] !== 'unknown' && Number(el[filterColumn]) > filterValue
      )));
      break;

    case 'menor que':
      setFilterResults(filterByName.filter((el) => (
        el[filterColumn] !== 'unknown' && Number(el[filterColumn]) < filterValue
      )));

      break;

    case 'igual a':
      setFilterResults(filterByName.filter((el) => (
        el[filterColumn] !== 'unknown' && Number(el[filterColumn]) === filterValue
      )));

      break;
    default: setFilterResults(filterByName);
    }
  };

  return (
    <>
      <label htmlFor="name-filter">
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          onChange={ ({ target }) => setFilterText(target.value) }
          value={ filterText }
        />
      </label>

      <select
        data-testid="column-filter"
        value={ filterColumn }
        onChange={ ({ target }) => setFilterColumn(target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        value={ filterComparison }
        onChange={ ({ target }) => setFilterComparison(target.value) }

      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <label htmlFor="value-filter">
        <input
          type="text"
          name="value-filter"
          id="value-filter"
          data-testid="value-filter"
          value={ filterValue }
          onChange={ ({ target }) => setFilterValue(Number(target.value)) }
        />
      </label>

      <label htmlFor="button-filter">
        <button
          data-testid="button-filter"
          id="button-filter"
          onClick={ numericFilter }
        >
          Filtre
        </button>
      </label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Terrain</th>
            <th>Population</th>
            <th>Diameter</th>
            <th>Gravity</th>
            <th>Orbital Period</th>
            <th>Rotation Period</th>
            <th>Surface Water</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            filterResults.length
              ? filterResults.map((el, index) => (
                <tr key={ index }>
                  <td>{el.name}</td>
                  <td>{el.climate}</td>
                  <td>{el.terrain}</td>
                  <td>{el.population}</td>
                  <td>{el.diameter}</td>
                  <td>{el.gravity}</td>
                  <td>{el.orbital_period}</td>
                  <td>{el.rotation_period}</td>
                  <td>{el.surface_water}</td>
                  <td>{el.films.join(', ')}</td>
                  <td>{el.created}</td>
                  <td>{el.edited}</td>
                  <td>{el.url}</td>
                </tr>
              ))
              : filterByName.map((el, index) => (
                <tr key={ index }>
                  <td>{el.name}</td>
                  <td>{el.climate}</td>
                  <td>{el.terrain}</td>
                  <td>{el.population}</td>
                  <td>{el.diameter}</td>
                  <td>{el.gravity}</td>
                  <td>{el.orbital_period}</td>
                  <td>{el.rotation_period}</td>
                  <td>{el.surface_water}</td>
                  <td>{el.films.join(', ')}</td>
                  <td>{el.created}</td>
                  <td>{el.edited}</td>
                  <td>{el.url}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </>

  );
}

export default TableOfPlanets;
