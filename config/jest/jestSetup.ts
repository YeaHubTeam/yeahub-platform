import '@testing-library/jest-dom';
import { setImmediate, clearImmediate } from 'timers';

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

function channelMock() {
	channelMock.prototype.onmessage = function () {};
	channelMock.prototype.postMessage = function (data) {
		this.onmessage({ data });
	};
}

global.BroadcastChannel = channelMock;

global.setImmediate = setImmediate;
global.clearImmediate = clearImmediate;

process.env.API_URL = 'http://localhost/';
