// const FLATBOND_URL = 'https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/flatbond';

export function fetchConfig() {
  return fetch('https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/config').then(res => res.json())
}