export const getGeolocationInfo = () =>{   
  const url = 'https://ipinfo.io';   
  const key = '2d352eddb1d4ba'
  return fetch(`${url}/json?token=${key}`)
            .then(res => res.json());           
}