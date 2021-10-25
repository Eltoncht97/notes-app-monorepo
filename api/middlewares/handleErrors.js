const ERROR_HANDLERS = {
  CastError: res => res.status(400).send({ error: 'id used is malformed' }),
  ValidationError: (res, {message}) => res.status(409).send({ error: message }),
  JsonWebTokenError: res => res.status(401).send({ error: 'token is invalid' }),
  defaultError: res => res.status(500).end()
}
module.exports = (error, request, response) => {
  console.error(error.name)

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  
  handler(response, error)
}