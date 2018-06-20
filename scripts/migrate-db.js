'use strict'

const args = process.argv.slice(2)
if (args.includes('--local') || args.includes('-L')) {
  const user = process.env.PG_USER || process.env.USER || 'bmz'
  const pw = process.env.PG_PASSWORD || ''
  const db = process.env.PG_DATABASE || 'risingstack_bootcamp'
  process.env.PG_URI = `postgres://${user}:${pw}@localhost:5432/${db}`
}

// TODO
const knex = require('../models/db')

knex.migrate.latest()
  .then(() => {
    console.log('Database synced successfully!')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
