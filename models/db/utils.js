'use strict'

const db = require('./')
const fp = require('lodash/fp')

const getColumns = (tableName) => db('information_schema.columns')
  .where({ table_name: tableName })
  .select('column_name')
  .options({ rowMode: 'array' })
  .then(fp.map(fp.first))

const addPrefixAliasToColumns = (tableName, columns) => {
  const fn = fp.map((column) => `${tableName}.${column} as ${tableName}_${column}`)

  if (columns) {
    return fn(columns)
  }
  return fn
}

const getColumnsByTableNamePrefix = (tableName, columns) => {
  const fn = fp.compose([
    fp.mapKeys(fp.replace(`${tableName}_`, '')),
    fp.pickBy((value, key) => fp.startsWith(`${tableName}_`, key))
  ])

  if (columns) {
    return fn(columns)
  }
  return fn
}

module.exports = {
  getColumns,
  addPrefixAliasToColumns,
  getColumnsByTableNamePrefix
}
