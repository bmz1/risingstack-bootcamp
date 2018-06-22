'use strict'

const db = require('../db')
const User = require('../user')

const tableName = 'repository'

async function insert({ id, owner, full_name, description, html_url, language, stargazers_count }) {
  const repository = {
    id,
    owner,
    full_name,
    description,
    html_url,
    language,
    stargazers_count
  }
  return db(tableName)
    .insert(repository)
    .returning('id')
}

async function read({ id, full_name }) {
  const repository = {
    id,
    full_name
  }
  /* eslint-disable */
  if (!id && !full_name) {
    throw Error('Id or login required. Both values are undefined.')
  }
  
  let condition = null
  if (id) {
    condition = {
      [`${tableName}.id`]: repository.id
    }
  }
  if (full_name) {
    condition = Object.assign({
      [`${tableName}.full_name`]: repository.full_name
    }, condition)
  }
  /* eslint-enable */

  const repo = await db(tableName)
    .select('*')
    .where(condition)
    .leftJoin(User.tableName, `${tableName}.owner`, `${User.tableName}.id`)
    .first()

  if (!repo) {
    return undefined
  }
  return repo
}


module.exports = {
  tableName,
  insert,
  read
}
