import React, { useContext, useMemo, useState } from 'react';
import fetchContext from '../context/FetchContext';
import HeaderTable from './HeaderTable';
import { columnOptions, comparisonOptions } from '../data';

function TableOfPlanets() {
  const { data } = useContext(fetchContext);
  const [filterText, setFilterText] = useState('');
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);
  const [filterResults, setFilterResults] = useState([]);
  const [columnSelectsOptions, setColumnSelectsOptions] = useState(columnOptions);
  const [
    comparisonSelectsOptions,
    setComparisonSelectsOptions,
  ] = useState(comparisonOptions);
  const [idNum, setIdNum] = useState(0);
  const [numberOfFilters, setNumberOfFilters] = useState([]);

  const filterByName = useMemo(() => (
    data.filter((el) => el.name.toLowerCase()
      .includes(filterText.toLowerCase()))
  ), [data, filterText]);

  const allFiltersAplyed = useMemo(() => {
    let filteredData = filterByName;

    numberOfFilters.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        filteredData = filteredData.filter(
          (el) => el[filter.column] !== 'unknown'
          && Number(el[filter.column]) > filter.value,
        );
        break;
      case 'menor que':
        filteredData = filteredData.filter(
          (el) => el[filter.column] !== 'unknown'
            && Number(el[filter.column]) < filter.value,
        );
        break;
      case 'igual a':
        filteredData = filteredData.filter(
          (el) => el[filter.column] !== 'unknown'
            && Number(el[filter.column]) === filter.value,
        );
        break;
      default:
        break;
      }
    });
    setFilterResults(filteredData);
    return filteredData;
  }, [filterByName, numberOfFilters]);

  const setHandleFilters = () => {
    const filteredColumn = columnSelectsOptions.filter((opt) => opt !== filterColumn);
    const filteredComparison = comparisonSelectsOptions
      .filter((opt) => opt !== filterComparison);

    setColumnSelectsOptions(filteredColumn);
    setComparisonSelectsOptions(filteredComparison);
    setFilterResults(allFiltersAplyed);
  };

  const aplyAllFilters = () => { // adiciona filtros
    const filtersToAply = [
      ...numberOfFilters,
      {
        id: idNum,
        column: filterColumn,
        comparison: filterComparison,
        value: filterValue,
      },
    ];

    const filteredColumn = columnSelectsOptions.filter((opt) => opt !== filterColumn);
    const filteredComparison = comparisonSelectsOptions
      .filter((opt) => opt !== filterComparison);

    setFilterColumn(filteredColumn[0]);
    setFilterComparison(filteredComparison[0]);
    setColumnSelectsOptions(filteredColumn);
    setComparisonSelectsOptions(filteredComparison);
    setFilterResults(allFiltersAplyed);
    setNumberOfFilters(filtersToAply);
    setIdNum(idNum + 1);
  };

  const removeAllFilters = () => { // remove todos os filtros
    setNumberOfFilters([]);
    setIdNum(0);
    setFilterText('');
    setFilterColumn('population');
    setFilterValue(0);
    setFilterResults([]);
    setColumnSelectsOptions(columnOptions);
    setComparisonSelectsOptions(comparisonOptions);
  };

  const removeSelectedFilter = (filterId) => { // remove filtro selecionado
    const remove = numberOfFilters.filter((el) => (
      el.id !== filterId
    ));
    setNumberOfFilters(remove);
    setColumnSelectsOptions(columnOptions);
    setComparisonSelectsOptions(comparisonOptions);
    setHandleFilters();
    console.log(numberOfFilters);
    console.log(remove);
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
        {
          columnSelectsOptions.map((opt, index) => (
            <option key={ index } value={ opt }>{ opt }</option>
          ))
        }
      </select>

      <select
        data-testid="comparison-filter"
        value={ filterComparison }
        onChange={ ({ target }) => setFilterComparison(target.value) }
      >
        {
          comparisonSelectsOptions.map((opt, index) => (
            <option key={ index } value={ opt }>{ opt }</option>
          ))
        }
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

      <label htmlFor="button-remove-filters">
        <button
          id="button-remove-filters"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remove all filters
        </button>
      </label>
      {
        numberOfFilters && numberOfFilters.map((info) => (
          <div
            key={ info.id }
            data-testid="filter"
          >
            <p>{ `${info.column} ${info.comparison} ${info.value}` }</p>
            <button onClick={ () => removeSelectedFilter(info.id) }>❌</button>
          </div>
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
