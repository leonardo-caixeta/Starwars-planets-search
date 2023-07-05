export default async function apiFetch() {
  const api = await fetch('https://swapi.dev/api/planets');
  const response = await api.json();
  const res = await response.results;
  console.log();
  return res;
}
