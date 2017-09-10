# FileStore - S3

Store and retreive files on S3.

## Installation

```sh
npm install --save @filestore/s3
```

## Usage

```js
const S3 = require('@filestore/s3')
const fs = require('fs')

const filestore = new S3({ bucket: 'my-files' })
const file = fs.createReadStream('my-file.txt')

filestore.put('my-file.txt', file).then(() => {
  // "my-file.txt" is now uploaded to the S3 bucket "my-files"
})
```

## API

The API is meant to be interchangeable with any other `@filestore/...` module.

### `new S3(options)`

+ `options.bucket` - Name of the bucket to store files in
+ `options.prefix` - Prefix that will be prepended to each key in S3 (e.g. `"files/"`)

Instantiates a new S3 FileStore class.

### `.put(id: string, data: Input[, options: object]) => Promise<void>`

Upload a file to S3.

`data` can be a `ReadableStream`, `Buffer`, `string`, `Iterable<Buffer|string>` or `Promise`.

### `.get(id: string) => ReadableStream`

Fetch a file from S3.

### `.has(id: string) => Promise<boolean>`

Check if a file exists on S3.
