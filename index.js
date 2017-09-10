'use strict'

const intoStream = require('into-stream')
const isStream = require('is-stream')
const S3 = require('aws-sdk/clients/s3')

const kBucket = Symbol('bucket')
const kClient = Symbol('client')
const kPrefix = Symbol('prefix')

module.exports = class FileStoreS3 {
  constructor (options) {
    if (typeof options !== 'object' || options === null) {
      throw new TypeError('Expected options object to be provided')
    }

    if (typeof options.bucket !== 'string') {
      throw new TypeError('Expected "bucket" option to be present and a string')
    }

    this[kBucket] = options.bucket
    this[kClient] = new S3({ apiVersion: '2006-03-01' })
    this[kPrefix] = (options.prefix || '')
  }

  put (id, data, options) {
    if (typeof id !== 'string') {
      throw new TypeError('Expected "id" to be a string')
    }

    if (!isStream(data)) {
      data = intoStream(data)
    }

    options = options || {}

    if (typeof options !== 'object') {
      throw new TypeError('Expected "options" to be an object')
    }

    const params = Object.assign({}, options, {
      Bucket: this[kBucket],
      Key: `${this[kPrefix]}${id}`,
      Body: data
    })

    return this[kClient].upload(params).promise().then(() => undefined)
  }

  get (id) {
    if (typeof id !== 'string') {
      throw new TypeError('Expected "id" to be a string')
    }

    const params = {
      Bucket: this[kBucket],
      Key: `${this[kPrefix]}${id}`
    }

    return this[kClient].getObject(params).createReadStream()
  }

  has (id) {
    if (typeof id !== 'string') {
      throw new TypeError('Expected "id" to be a string')
    }

    const params = {
      Bucket: this[kBucket],
      Key: `${this[kPrefix]}${id}`
    }

    return this[kClient].headObject(params).promise()
      .then(() => true)
      .catch((err) => {
        if (err.code === 'NotFound') return false

        throw err
      })
  }
}
