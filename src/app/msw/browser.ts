import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

// @ts-expect-error: MSW v2 type mismatch between HttpHandler and RequestHandler
export const worker = setupWorker(...handlers);
