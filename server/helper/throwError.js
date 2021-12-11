module.exports.throwError = (message, status = 400) => {
  let err = new Error(message);
  err.status = status;
  err.data = { success: false };
  throw err;
};
