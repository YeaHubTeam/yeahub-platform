import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '@/shared/libs';

import { Switch } from './Switch';
import { SwitchProps } from './types';

const defaultProps: SwitchProps = {
	checked: false,
	onChange: jest.fn(),
};

const renderSwitch = (props?: Partial<SwitchProps>) => {
	renderComponent(<Switch {...defaultProps} {...props} />);
};

describe('Switch', () => {
	it('renders switch input', () => {
		renderSwitch();

		expect(screen.getByRole('switch')).toBeInTheDocument();
	});

	it('renders as checked when checked prop is true', () => {
		renderSwitch({ checked: true });

		const input = screen.getByRole('switch');

		expect(input).toBeChecked();
		expect(input).toHaveAttribute('aria-checked', 'true');
	});

	it('renders as unchecked when checked prop is false', () => {
		renderSwitch({ checked: false });

		const input = screen.getByRole('switch');

		expect(input).not.toBeChecked();
		expect(input).toHaveAttribute('aria-checked', 'false');
	});

	it('calls onChange when clicked', async () => {
		const onChange = jest.fn();
		renderSwitch({ onChange });

		await userEvent.click(screen.getByRole('switch'));

		expect(onChange).toHaveBeenCalledTimes(1);
	});

	it('does not call onChange when disabled', async () => {
		const onChange = jest.fn();
		renderSwitch({ disabled: true, onChange });

		await userEvent.click(screen.getByRole('switch'));

		expect(onChange).not.toHaveBeenCalled();
	});

	it('renders with disabled attribute', () => {
		renderSwitch({ disabled: true });

		expect(screen.getByRole('switch')).toBeDisabled();
	});

	it('renders label when provided', () => {
		renderSwitch({ label: 'label' });

		expect(screen.getByText('label')).toBeInTheDocument();
	});

	it('does not render label when not provided', () => {
		renderSwitch();

		expect(screen.queryByText('label')).not.toBeInTheDocument();
	});

	it('passes inputProps to input element', () => {
		renderSwitch({ inputProps: { 'aria-label': 'toggle' } });

		expect(screen.getByRole('switch')).toHaveAttribute('aria-label', 'toggle');
	});
});
