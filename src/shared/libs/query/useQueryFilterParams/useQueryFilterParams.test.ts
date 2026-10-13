import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useQueryFilterParams } from './useQueryFilterParams';

jest.mock('react-router-dom', () => ({
	useLocation: jest.fn(),
	useNavigate: jest.fn(),
}));

interface Params {
	page: number;
	status: string;
	title?: string | null | undefined;
	skills?: number[];
}

const initialParams: Params = { page: 1, status: 'all' };
const currentParams: Params = { page: 3, status: 'learned', title: 'react' };

let mockNavigate: jest.Mock;
let mockLocation: { search: string; hash: string };

beforeEach(() => {
	mockNavigate = jest.fn();
	mockLocation = { search: '', hash: '' };

	(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
	(useLocation as jest.Mock).mockReturnValue(mockLocation);
});

describe('initialization and navigation', () => {
	it('initialize filters with currentParams', () => {
		const { result } = renderHook(() => useQueryFilterParams(initialParams, currentParams));
		expect(result.current.filters).toEqual(currentParams);
	});

	it('navigate to initialParams when URL has no search params', () => {
		mockLocation.search = '';
		mockLocation.hash = '#section';

		renderHook(() => {
			useQueryFilterParams(initialParams, currentParams);
		});
		expect(mockNavigate).toHaveBeenCalledWith('?page=1&status=all#section', { replace: true });
	});

	it('not navigate when URL already has search params', () => {
		mockLocation.search = '?page=2&status=-not-learned';
		renderHook(() => {
			useQueryFilterParams(initialParams, currentParams);
			expect(mockNavigate).not.toHaveBeenCalled();
		});
	});
});

describe('onFilterChange', () => {
	it('update filters with new params', () => {
		const { result } = renderHook(() => useQueryFilterParams(initialParams, currentParams));
		act(() => result.current.onFilterChange({ page: 5, status: 'all' }));
		expect(result.current.filters).toEqual({
			...currentParams,
			page: 5,
			status: 'all',
		});
	});

	it('navigate to URL with updated params', () => {
		mockLocation.search = '?page=2&status=-not-learned';
		mockLocation.hash = '#section';
		const { result } = renderHook(() => useQueryFilterParams(initialParams, currentParams));
		act(() => result.current.onFilterChange({ page: 5, status: 'all' }));
		expect(mockNavigate).toHaveBeenCalledWith('?page=5&status=all&title=react#section');
	});

	it('delete param from URL if value is null', () => {
		mockLocation.search = '?page=2&status=-not-learned&title=react';
		mockLocation.hash = '#section';

		const { result } = renderHook(() => useQueryFilterParams(initialParams, currentParams));
		act(() => result.current.onFilterChange({ page: 5, status: 'all', title: null }));
		expect(mockNavigate).toHaveBeenCalledWith('?page=5&status=all#section');
	});

	it('delete param from URL if value is undefined', () => {
		mockLocation.search = '?page=2&status=-not-learned&title=react';
		mockLocation.hash = '#section';

		const { result } = renderHook(() => useQueryFilterParams(initialParams, currentParams));
		act(() => result.current.onFilterChange({ page: 5, status: 'all', title: undefined }));
		expect(mockNavigate).toHaveBeenCalledWith('?page=5&status=all#section');
	});

	it('handle array values as string', () => {
		mockLocation.search = '?page=2&status=-not-learned';
		mockLocation.hash = '#section';
		const { result } = renderHook(() => useQueryFilterParams(initialParams, currentParams));
		act(() => {
			result.current.onFilterChange({ page: 5, status: 'all', skills: [5, 8] });
		});
		expect(mockNavigate).toHaveBeenCalledWith(
			expect.stringMatching(/\?page=5&status=all&title=react&skills=5(,|%2C)8#section/),
		);
	});
});

describe('onResetFilters', () => {
	it('reset filters to initialParams', () => {
		const { result } = renderHook(() => useQueryFilterParams(initialParams, currentParams));
		act(() => {
			result.current.onFilterChange({ page: 5, status: 'all' });
		});
		expect(result.current.filters).toEqual({
			...currentParams,
			page: 5,
			status: 'all',
		});
		act(() => {
			result.current.onResetFilters();
		});
		expect(result.current.filters).toEqual(initialParams);
	});

	it('navigate to initialParams URL', () => {
		mockLocation.hash = '#section';

		const { result } = renderHook(() => useQueryFilterParams(initialParams, currentParams));
		act(() => {
			result.current.onResetFilters();
		});
		expect(mockNavigate).toHaveBeenCalledWith('?page=1&status=all#section', { replace: true });
	});
});
