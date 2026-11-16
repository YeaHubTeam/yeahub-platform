/**
 * Runs before the test environment (happy-dom) exposes its globals.
 *
 * On Node 22 `fetch`, `Blob`, `File`, `FormData`, `Headers`, `Request`, `Response`,
 * `ReadableStream`, `TextEncoder`/`TextDecoder`, `setImmediate`, `matchMedia` are provided
 * natively either by Node or by happy-dom, so no polyfills are needed for them.
 */

// `msw` creates a `BroadcastChannel` at module load (`msw/src/core/ws.ts`), but happy-dom
// doesn't expose it on `window`. Reuse Node's native implementation: msw calls `unref()` on it,
// so the channel doesn't keep the Jest worker alive.
const { BroadcastChannel: NodeBroadcastChannel } = require('node:worker_threads');

Object.defineProperty(globalThis, 'BroadcastChannel', {
	value: NodeBroadcastChannel,
	writable: true,
	configurable: true,
});

Object.defineProperty(globalThis, 'BroadcastChannel', {
	value: BroadcastChannel,
	writable: true,
	configurable: true,
});
