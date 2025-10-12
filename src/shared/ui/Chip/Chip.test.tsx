import { screen } from '@testing-library/react';
import uE from '@testing-library/user-event';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { Chip } from './Chip';

describe('Chip', () => {
	const userEvent = uE.setup();

	it('should render with label', () => {
		renderComponent(<Chip label="Chip" />);
		const text = screen.getByText('Chip');

		expect(text).toBeInTheDocument();
	});

	it('should render with prefix when it is provided', () => {
		const prefix = <span data-testid="prefix">Prefix</span>;
		renderComponent(<Chip label="Chip" prefix={prefix} />);

		expect(screen.getByTestId('prefix')).toBeInTheDocument();
	});

	it('should call onClick when clicked', async () => {
		const fn = jest.fn();
		renderComponent(<Chip label="Chip" onClick={fn} />);

		await userEvent.click(screen.getByRole('button'));
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('should call onClick when pressing Enter or Space', async () => {
		const fn = jest.fn();
		renderComponent(<Chip label="Chip" onClick={fn} />);

		const chip = screen.getByRole('button');

		await userEvent.click(chip);
		await userEvent.keyboard('[Enter]');
		await userEvent.keyboard('[Space]');

		expect(fn).toHaveBeenCalledTimes(3);
	});

	it('should not not call onClick when disabled', async () => {
		const fn = jest.fn();

		renderComponent(<Chip label="Chip" onClick={fn} disabled />);
		const chip = screen.getByRole('button', { hidden: true });
		await userEvent.click(chip);

		expect(fn).not.toHaveBeenCalled();
	});

	it('should render delete icon with necessary prop and call onDelete', async () => {
		const onDelete = jest.fn();

		renderComponent(<Chip label="Chip" onDelete={onDelete} />);
		const icon = screen.getByTestId('icon');
		await userEvent.click(icon);

		expect(onDelete).toHaveBeenCalledTimes(1);
	});

	it('should render delete icon with disabled styles when disabled', () => {
		const fn = jest.fn();
		renderComponent(<Chip label="Chip" onDelete={fn} disabled />);
		const icon = screen.getByTestId('icon');

		expect(icon).toHaveAttribute('color', expect.stringContaining('black-100'));
	});

	it('should not call onClick for other keys', async () => {
		const onClick = jest.fn();

		renderComponent(<Chip label="Chip" onClick={onClick} />);
		const chip = screen.getByRole('button');
		chip.focus();

		await userEvent.keyboard('[a]');
		expect(onClick).not.toHaveBeenCalled();
	});
});
