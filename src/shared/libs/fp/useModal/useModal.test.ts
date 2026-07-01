import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { useModal } from './useModal';

describe('useModal', () => {
	test('should initialize with isOpen = false', () => {
		const { result } = renderHook(() => useModal());
		expect(result.current.isOpen).toBe(false);
	});

	test('should set isOpen to true when onOpen is called', () => {
		const { result } = renderHook(() => useModal());
		act(() => {
			result.current.onOpen();
		});
		expect(result.current.isOpen).toBe(true);
	});

	test('should set isOpen to false when onClose is called', () => {
		const { result } = renderHook(() => useModal());
		act(() => {
			result.current.onOpen();
		});
		expect(result.current.isOpen).toBe(true);

		act(() => {
			result.current.onClose();
		});
		expect(result.current.isOpen).toBe(false);
	});

	test('onToggle should toggle isOpen', () => {
		const { result } = renderHook(() => useModal());
		act(() => {
			result.current.onToggle();
		});
		expect(result.current.isOpen).toBe(true);
		act(() => {
			result.current.onToggle();
		});
		expect(result.current.isOpen).toBe(false);
	});
});
