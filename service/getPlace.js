export const getPlace = (position) => {
  const key = "a4582d9d321743509dec3b34b7464029";
  const { latitude, longitude } = position;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${key}`;
  return fetch(url).then((response) => response.json());
};
