'use strict'

const db = require('../db')

const tableName = 'user'

async function insert({ id, login, avatar_url, html_url, type }) {
  const user = {
    id,
    login,
    avatar_url,
    html_url,
    type
  }
/* eslint-disable */
  return db(tableName)
    .insert(user)
    .returning('*')
    .catch(
      (err) => {
        if (!login) {
          throw 'No value specified for login'
        }
        console.log(err)
      })
}
/* eslint-enable */

async function read({ id, login }) {
  const selection = {
    id,
    login
  }

  return db(tableName)
    .where(selection)
    .select()
    .first()
}

module.exports = {
  tableName,
  insert,
  read
}
