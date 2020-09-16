export function getWeather(position) {
  const key = "8669fa55cf69033d60b257c56893a828";
  const { latitude, longitude } = position;
  let url;
  if (
    position !== undefined &&
    longitude !== undefined &&
    latitude !== undefined
  ) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  }
  return fetch(url).then((res) => res.json());
}
