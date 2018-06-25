'use strict'

const { expect } = require('chai')
const db = require('../db')
const User = require('./user')

describe('User', () => {
  let id
  let sampleUser

  beforeEach(async () => {
    id = Math.floor(Math.random() * 100)
    sampleUser = {
      id,
      login: 'username',
      avatar_url: 'http://asd.com/avatar',
      html_url: 'http://asd.com/html',
      type: 'admin'
    }
  })

  afterEach(async () => {
    await db(User.tableName)
      .where({ id })
      .delete()
  })

  describe('.insert', () => {
    it('should insert a new user', async () => {
      const { login, avatar_url, html_url, type } = sampleUser
      const insertedUser = await User.insert({ id, login, avatar_url, html_url, type })
      expect(insertedUser).to.eql([{ id, login, avatar_url, html_url, type }])
      expect(insertedUser[0].login).not.eql(undefined)
    })
    it('should throw an error if a property is undefined', async () => {
      const { avatar_url, html_url, type } = sampleUser

      try {
        await User.insert({ id, avatar_url, html_url, type })
      } catch (err) {
        expect(err).to.eql('No value specified for login')
      }
    })
  })
})
