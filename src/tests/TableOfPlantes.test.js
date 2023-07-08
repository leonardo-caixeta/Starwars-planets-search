import { act, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';
import FetchProvider from '../context/FetchProvider';
import fetchContext from '../context/FetchContext';

// jest.mock('../context/FetchProvider');
// jest.spyOn(global, 'fetch');
// global.fetch.mockResolvedValue({
//   json: jest.fn().mockResolvedValue(testData)
// })

// jest.mock('../context/FetchProvider', () => {
//   return {
//     __esModule: true,
//     default: function MockFetchProvider({ children }) {
//       return (
//         <fetchContext.Provider value={{ testData }}>
//           {children}
//         </fetchContext.Provider>
//       );
//     },
//   };
// });

describe('Testes do componente TableOfPlanets',() => {
  beforeEach(() => (
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    })
  ));

  it('Teste de filtros por comparador', async () => {
    render(<App />);
    const planet = await screen.findByText(/coruscant/i,{}, { timeout: 3000 });
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    expect(planet).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();

    act(() => {
      userEvent.selectOptions(columnFilter, 'population');
      userEvent.selectOptions(comparisonFilter, 'igual a');
      userEvent.type(valueFilter, '1000000000000');
      userEvent.click(filterButton);
    });

    expect(screen.getByText(/population igual a 1000000000000/i))
    .toBeInTheDocument();

    expect(await screen.findByText(/coruscant/i, {}, { timeout: 3000 })).toBeInTheDocument();

  window.location.reload();

    act(() => {
      userEvent.selectOptions(columnFilter, 'diameter');
      userEvent.selectOptions(comparisonFilter, 'maior que');
      userEvent.type(valueFilter, '100000');
      userEvent.click(filterButton);
    });

    expect(screen.getByText(/bespin/i, {}, { timeout: 3000 })).toBeInTheDocument();

  window.location.reload();

    act(() => {
      userEvent.selectOptions(columnFilter, 'orbital_period');
      userEvent.selectOptions(comparisonFilter, 'menor que');
      userEvent.type(valueFilter, '5000');
      userEvent.click(filterButton);
    });

    expect(screen.getByText(/tatooine/i, {}, { timeout: 3000 })).toBeInTheDocument();

  });
  it('Teste de filtro por texto', async () => {
    render(<App />);
    const nameFilter = screen.getByTestId('name-filter');
    const filterButton = screen.getByTestId('button-filter');

    expect(nameFilter).toBeInTheDocument();

    act(() => {
      userEvent.type(nameFilter, 'en');
      userEvent.click(filterButton);
    });

    expect(await screen.findByText(/endor/i, {}, { timeout: 3000 })).toBeInTheDocument();
  });
});
