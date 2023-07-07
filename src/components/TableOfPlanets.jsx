import React, { useContext, useMemo, useState } from 'react';
import fetchContext from '../context/FetchContext';
import HeaderTable from './HeaderTable';

function TableOfPlanets() {
  const { data } = useContext(fetchContext);

  const [filterText, setFilterText] = useState('');
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);
  const [filterResults, setFilterResults] = useState([]);

  const [idNum, setIdNum] = useState(0);
  const [numberOfFilters, setNumberOfFilters] = useState([]);

  const filterByName = useMemo(() => (
    data.filter((el) => el.name.toLowerCase()
      .includes(filterText.toLowerCase()))
  ), [data, filterText]);

  const aplyAllFilters = () => {
    const filtersToAply = [
      ...numberOfFilters,
      {
        id: idNum,
        column: filterColumn,
        comparison: filterComparison,
        value: filterValue,
      },
    ];

    let allFiltersAplyed = filterByName;

    filtersToAply.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        allFiltersAplyed = allFiltersAplyed.filter((el) => (
          el[filter.column] !== 'unknown' && Number(el[filter.column]) > filter.value
        ));
        break;

      case 'menor que':
        allFiltersAplyed = allFiltersAplyed.filter((el) => (
          el[filter.column] !== 'unknown' && Number(el[filter.column]) < filter.value
        ));

        break;

      case 'igual a':
        allFiltersAplyed = allFiltersAplyed.filter((el) => (
          el[filter.column] !== 'unknown' && Number(el[filter.column]) === filter.value
        ));

        break;
      default:
      }
    });

    setFilterResults(allFiltersAplyed);
    setNumberOfFilters(filtersToAply);
    setIdNum(idNum + 1);
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
          onClick={ aplyAllFilters }
        >
          Filtre
        </button>
      </label>
      {
        numberOfFilters && numberOfFilters.map((info) => (
          <p key={ info.id }>{ `${info.column} ${info.comparison} ${info.value}` }</p>
        ))
      }
      <table>
        <HeaderTable />
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
