const { TextDecoder, TextEncoder } = require('node:util');

const { ReadableStream } = require('web-streams-polyfill');

Object.defineProperties(globalThis, {
	ReadableStream: { value: ReadableStream },
	TextDecoder: { value: TextDecoder },
	TextEncoder: { value: TextEncoder },
});

const { Blob, File } = require('node:buffer');

const { fetch, Headers, FormData, Request, Response } = require('undici');

Object.defineProperties(globalThis, {
	fetch: { value: fetch, writable: true },
	Blob: { value: Blob },
	File: { value: File },
	Headers: { value: Headers },
	FormData: { value: FormData },
	Request: { value: Request },
	Response: { value: Response },
});
