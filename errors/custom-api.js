class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    this.status = 'failed';
  }
}

module.exports = CustomAPIError;
