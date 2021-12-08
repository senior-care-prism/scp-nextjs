import moment from 'moment';

export function formatDate(dateString) {
  return moment(dateString).format('LL');
}

export function cleanupQuery(query, newItem) {
  const result = newItem === undefined ? { ...query } : { ...query, ...newItem };
  Object.keys(result).forEach((key) => {
    if (result[key] === '' || (key === 'p' && result[key] === '1')) {
      delete result[key];
    }
  });
  return result;
}

export function formatQuerystring(query) {
  return `?${Object.entries(query).map((keyValue) => keyValue.join('=')).join('&')}`;
}
