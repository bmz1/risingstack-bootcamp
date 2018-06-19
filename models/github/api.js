'use strict'

const request = require('request-promise-native')

const API_URL = 'https://api.github.com'
const USER_AGENT = 'risingstack'

const searchRepositories = (query = {}) => request({
  method: 'GET',
  url: `${API_URL}/search/repositories`,
  qs: query,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'user-agent': USER_AGENT
  },
  json: true
})
/*

const getContributors = (repository, query = {}) => {

}
*/

module.exports = {
  searchRepositories,
}
