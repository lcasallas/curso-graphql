function errorHandler(error) {
  console.log('[error]', error);
  throw new Error('Error en la operacion con el servidor');
}

module.exports = errorHandler;
