'use strict'

const nock = require('nock')
const { expect } = require('chai')
const api = require('./api')

describe('GitHub API', () => {
  it('should search repositories', async () => {
    const githubAPI = nock('https://api.github.com', {
      reqheaders: {
        Accept: 'application/vnd.github.v3+json',
        'user-agent': 'risingstack'
      }
    })
      .get('/search/repositories')
      .query({ q: 'language:javascript' })
      .reply(200, { items: [] })

    const result = await api.searchRepositories({ q: 'language:javascript' })
    expect(githubAPI.isDone()).to.eql(true)
    expect(result).to.eql({ items: [] })
  })
})

