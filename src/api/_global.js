export const SERVER_ENDPOINT =
  import.meta.env.MODE === 'development'
    ? 'http://51.250.71.3:3030'
    : `http://${window.location.hostname}:3030`
