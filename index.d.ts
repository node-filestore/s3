/// <reference types="node" />

import { Readable } from 'stream'
import { ObjectCannedACL, BucketName, CacheControl, ContentDisposition, ContentEncoding, ContentLanguage, ContentLength, ContentMD5, ContentType, Expires, GrantFullControl, GrantRead, GrantReadACP, GrantWriteACP, Metadata, ServerSideEncryption, StorageClass, WebsiteRedirectLocation, SSECustomerAlgorithm, SSECustomerKey, SSECustomerKeyMD5, SSEKMSKeyId, RequestPayer, TaggingHeader } from 'aws-sdk/clients/s3'

declare interface Options {
  bucket: BucketName
  prefix?: string
}

declare interface PutOptions {
  /**
   * The canned ACL to apply to the object.
   */
  ACL?: ObjectCannedACL;
  /**
   * Specifies caching behavior along the request/reply chain.
   */
  CacheControl?: CacheControl;
  /**
   * Specifies presentational information for the object.
   */
  ContentDisposition?: ContentDisposition;
  /**
   * Specifies what content encodings have been applied to the object and thus what decoding mechanisms must be applied to obtain the media-type referenced by the Content-Type header field.
   */
  ContentEncoding?: ContentEncoding;
  /**
   * The language the content is in.
   */
  ContentLanguage?: ContentLanguage;
  /**
   * Size of the body in bytes. This parameter is useful when the size of the body cannot be determined automatically.
   */
  ContentLength?: ContentLength;
  /**
   * The base64-encoded 128-bit MD5 digest of the part data.
   */
  ContentMD5?: ContentMD5;
  /**
   * A standard MIME type describing the format of the object data.
   */
  ContentType?: ContentType;
  /**
   * The date and time at which the object is no longer cacheable.
   */
  Expires?: Expires;
  /**
   * Gives the grantee READ, READ_ACP, and WRITE_ACP permissions on the object.
   */
  GrantFullControl?: GrantFullControl;
  /**
   * Allows grantee to read the object data and its metadata.
   */
  GrantRead?: GrantRead;
  /**
   * Allows grantee to read the object ACL.
   */
  GrantReadACP?: GrantReadACP;
  /**
   * Allows grantee to write the ACL for the applicable object.
   */
  GrantWriteACP?: GrantWriteACP;
  /**
   * A map of metadata to store with the object in S3.
   */
  Metadata?: Metadata;
  /**
   * The Server-side encryption algorithm used when storing this object in S3 (e.g., AES256, aws:kms).
   */
  ServerSideEncryption?: ServerSideEncryption;
  /**
   * The type of storage to use for the object. Defaults to 'STANDARD'.
   */
  StorageClass?: StorageClass;
  /**
   * If the bucket is configured as a website, redirects requests for this object to another object in the same bucket or to an external URL. Amazon S3 stores the value of this header in the object metadata.
   */
  WebsiteRedirectLocation?: WebsiteRedirectLocation;
  /**
   * Specifies the algorithm to use to when encrypting the object (e.g., AES256).
   */
  SSECustomerAlgorithm?: SSECustomerAlgorithm;
  /**
   * Specifies the customer-provided encryption key for Amazon S3 to use in encrypting data. This value is used to store the object and then it is discarded; Amazon does not store the encryption key. The key must be appropriate for use with the algorithm specified in the x-amz-server-side​-encryption​-customer-algorithm header.
   */
  SSECustomerKey?: SSECustomerKey;
  /**
   * Specifies the 128-bit MD5 digest of the encryption key according to RFC 1321. Amazon S3 uses this header for a message integrity check to ensure the encryption key was transmitted without error.
   */
  SSECustomerKeyMD5?: SSECustomerKeyMD5;
  /**
   * Specifies the AWS KMS key ID to use for object encryption. All GET and PUT requests for an object protected by AWS KMS will fail if not made via SSL or using SigV4. Documentation on configuring any of the officially supported AWS SDKs and CLI can be found at http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingAWSSDK.html#specify-signature-version
   */
  SSEKMSKeyId?: SSEKMSKeyId;
  RequestPayer?: RequestPayer;
  /**
   * The tag-set for the object. The tag-set must be encoded as URL Query parameters
   */
  Tagging?: TaggingHeader;
}

declare type Input = Readable | Buffer | string | Iterable<Buffer | string>

declare class FileStoreS3 {
  constructor (options: Options)
  put (id: string, data: Input, options?: PutOptions): Promise<void>
  get (id: string): Readable
  has (id: string): Promise<boolean>
}

export = FileStoreS3
