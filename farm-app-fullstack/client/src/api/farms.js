const getFarms = () => {
  // retrieve farm data
  return fetch('/farms')
  	.then(res => (res.json()));
};

module.exports = {
  getFarms: getFarms
};
