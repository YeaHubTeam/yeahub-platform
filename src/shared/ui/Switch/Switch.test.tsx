import { describe } from 'node:test';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { createRef, RefObject } from 'react';

import { renderComponent } from '@/shared/libs';
import { switchTestIds } from '@/shared/ui/Switch/constants';

import { Switch } from './Switch';
import { SwitchProps } from './types';

const defaultProps: SwitchProps = {
	checked: false,
	onChange: jest.fn(),
};

const renderSwitch = (props?: Partial<SwitchProps> & { ref?: RefObject<HTMLDivElement> }) => {
	renderComponent(<Switch {...defaultProps} {...props} />);
};

describe('Switch', () => {
	describe('wrapper', () => {
		test('render', () => {
			renderSwitch();
			const wrapper = screen.getByTestId(switchTestIds.wrapper);
			expect(wrapper).toBeInTheDocument();
			expect(wrapper).toHaveClass('align-center');
		});
	});

	describe('switch', () => {
		test('render', () => {
			renderSwitch();
			const switchEl = screen.getByTestId(switchTestIds.switch);
			expect(switchEl).toBeInTheDocument();
		});
	});

	describe('input', () => {
		test('render', () => {
			renderSwitch();
			const input = screen.getByTestId(switchTestIds.input);
			expect(input).toBeInTheDocument();
			expect(input).toHaveAttribute('type', 'checkbox');
			expect(input).toHaveAttribute('role', 'switch');
			expect(input).not.toHaveAttribute('checked');
			expect(input).toHaveAttribute('aria-checked', 'false');
			expect(input).not.toHaveAttribute('disabled');
			expect(input).toHaveClass('switch-input');
		});

		test('inputRef props', () => {
			const testRef = createRef<HTMLInputElement>();
			renderSwitch({ inputRef: testRef });
			const input = screen.getByTestId(switchTestIds.input);
			expect(testRef.current).toBe(input);
			expect(testRef.current?.tagName).toBe('INPUT');
		});

		it('checked=true props', () => {
			renderSwitch({ checked: true });
			const input = screen.getByTestId(switchTestIds.input);
			expect(input).toBeChecked();
			expect(input).toHaveAttribute('aria-checked', 'true');
		});

		it('disabled=true props', () => {
			renderSwitch({ disabled: true });
			const input = screen.getByTestId(switchTestIds.input);
			expect(input).toBeDisabled();
		});

		it('calls onChange when clicked', async () => {
			const onChange = jest.fn();
			renderSwitch({ onChange });
			const input = screen.getByTestId(switchTestIds.input);
			await userEvent.click(input);
			expect(onChange).toHaveBeenCalledTimes(1);
		});

		it('does not call onChange when disabled', async () => {
			const onChange = jest.fn();
			renderSwitch({ disabled: true, onChange });
			const input = screen.getByTestId(switchTestIds.input);
			await userEvent.click(input);
			expect(onChange).not.toHaveBeenCalled();
		});
	});

	describe('pin', () => {
		test('render', () => {
			renderSwitch();
			const pin = screen.getByTestId(switchTestIds.pin);
			expect(pin).toBeInTheDocument();
			expect(pin).toHaveClass('switch-slider');
		});

		test('render with pinClassName props', () => {
			renderSwitch({ pinClassName: 'pin' });
			const pin = screen.getByTestId(switchTestIds.pin);
			expect(pin).toBeInTheDocument();
			expect(pin).toHaveClass('switch-slider', 'pin');
		});
	});

	describe('label', () => {
		test('render without label props', () => {
			renderSwitch();
			const label = screen.queryByTestId(switchTestIds.label);
			expect(label).not.toBeInTheDocument();
		});

		test('render with label props', () => {
			renderSwitch({ label: 'Label' });
			const label = screen.queryByTestId(switchTestIds.label);
			expect(label).toBeInTheDocument();
			expect(label).toHaveTextContent('Label');
			expect(label).toHaveClass('switch-label');
		});

		test('render with labelClassName props', () => {
			renderSwitch({ label: 'Label', labelClassName: 'label-classname' });
			const label = screen.queryByTestId(switchTestIds.label);
			expect(label).toBeInTheDocument();
			expect(label).toHaveClass('switch-label', 'label-classname');
		});
	});
});
