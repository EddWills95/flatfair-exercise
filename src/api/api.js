const CONFIG_URL = 'https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/config';
const FLATBOND_URL = 'https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/flatbond';

export function fetchConfig() {
  return fetch(CONFIG_URL).then(res => res.json())
}

export function postForm(data) {
  return fetch(FLATBOND_URL, JSON.stringify(data))
    .then(res => res.json());
}