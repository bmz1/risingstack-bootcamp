'use strict'

const joi = require('joi')

const schema = joi.object({
  PORT: joi.number().min(0).max(65535)
    .required()
})
  .unknown()

const schemaVal = joi.attempt(process.env, schema)

const config = {
  port: schemaVal.PORT
}

module.exports = config
