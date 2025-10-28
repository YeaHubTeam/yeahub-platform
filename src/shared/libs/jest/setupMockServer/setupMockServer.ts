// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { server } from '@/app/msw/server';

export const setupMockServer = () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	return server;
};
