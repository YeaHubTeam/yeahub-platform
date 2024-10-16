const { Blob, File } = require('node:buffer');
const { TextDecoder, TextEncoder } = require('node:util');

const { fetch, Headers, FormData, Request, Response } = require('undici');
const { ReadableStream } = require('web-streams-polyfill');

Object.defineProperties(globalThis, {
  ReadableStream: { value: ReadableStream },
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
});

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
});
