
const isANumber = function(str) {
	const result = {
	  success: true,
	  errorCode: null
	}
	if (isNaN(Number(str))) {
      result.success = false;
      result.errorCode = 'NOT_A_NUMBER';
    }
    return result;
};

module.exports = {
  isANumber: isANumber
};