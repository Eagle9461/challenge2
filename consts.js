const port = 8888;

const stateNames = {
  "Alaska": 'AK',
  "Florida": 'FL',
  "New York": "NY",
  "California": "CA",
  "Kansas": "KS",
  "Arizona": "AZ",
  "Tennessee": "TN",
  "Nevada": "NV"
};

const dataUrlArray = [
  'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json',
  'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json'
];

exports.port = port;
exports.stateNames = stateNames;
exports.dataUrlArray = dataUrlArray;