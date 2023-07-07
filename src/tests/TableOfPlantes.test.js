import { act, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import FetchProvider from '../context/FetchProvider';

describe('Testes do componente TableOfPlanets',() => {
  it('Teste de filtros por comparador', async () => {
    render(
      <FetchProvider>
        <App />
     </FetchProvider>
    )
    // const planet = await screen.findByText(/coruscant/i);
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    // expect(planet).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();

    act(() => {
      userEvent.selectOptions(columnFilter, 'population');
      userEvent.selectOptions(comparisonFilter, 'igual a');
      userEvent.type(valueFilter, '1000000000000');
      userEvent.click(filterButton);
    })

    expect(screen.getByText(/population igual a 1000000000000/i))
    .toBeInTheDocument();

    await waitFor(() => (
      setTimeout(() => expect(screen.getByText( /coruscant/i )).toBeInTheDocument(), 4000)
      ))

    window.location.reload();

    act(() => {
      userEvent.selectOptions(columnFilter, 'diameter');
      userEvent.selectOptions(comparisonFilter, 'maior que');
      userEvent.type(valueFilter, '100000');
      userEvent.click(filterButton);
    })

    await waitFor(() => (
      setTimeout(() => expect(screen.getByText( /bespin/i )).toBeInTheDocument(), 4000)
      ))

    window.location.reload();

    act(() => {
      userEvent.selectOptions(columnFilter, 'orbital_period');
      userEvent.selectOptions(comparisonFilter, 'menor que');
      userEvent.type(valueFilter, '5000');
      userEvent.click(filterButton);
    })

    await waitFor(() => (
      setTimeout(() => expect(screen.getByText( /tatooine/i )).toBeInTheDocument(), 4000)
      ))
  });
  it('Teste de filtro por texto', async () => {
    render(
      <FetchProvider>
        <App />
     </FetchProvider>
    )
    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();

    act(() => {
      userEvent.type(nameFilter, 'en')
    })

    await waitFor(() => (
      setTimeout(() => expect(screen.getByText( /endor/i )).toBeInTheDocument(), 4000)
      ))
  });
});
