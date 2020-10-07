const getFarms = () => {
  return fetch('/farms')
  	.then(res => (res.json()));
};

module.exports = {
  getFarms: getFarms
};
