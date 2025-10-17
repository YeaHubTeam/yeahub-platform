import { screen } from '@testing-library/react';
import uE from '@testing-library/user-event';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { ChipSkeleton } from './Chip.skeleton';

describe('Chip skeleton', () => {
	const userEvent = uE.setup();

	it('should render prefix if provided', () => {
		const prefix = <span data-testid="prefix">Chip</span>;
		renderComponent(<ChipSkeleton label="Chip" prefix={prefix} />);

		expect(screen.getByTestId('prefix')).toBeInTheDocument();
	});

	it('should render delete icon when onDelete is provided and trigger onDelete click', async () => {
		const onDelete = jest.fn();

		renderComponent(<ChipSkeleton label="Chip" onDelete={onDelete} />);
		const icon = screen.getByTestId('icon-skeleton');
		await userEvent.click(icon);

		expect(onDelete).toHaveBeenCalledTimes(1);
	});

	it('should render delete icon in disabled state with correct color', () => {
		renderComponent(<ChipSkeleton label="Chip" onDelete={jest.fn()} disabled />);
		const iconButton = screen.getByTestId('icon-skeleton');

		expect(iconButton.querySelector('div')).toHaveStyle('color: black-100');
	});

	it('should call onClick on wrapper click and keyboard events', async () => {
		const onClick = jest.fn();

		renderComponent(<ChipSkeleton label="Chip" onClick={onClick} />);
		const chip = screen.getByRole('button');

		await userEvent.click(chip);
		await userEvent.keyboard('[Enter]');
		await userEvent.keyboard('[Space]');

		expect(onClick).toHaveBeenCalledTimes(3);
	});

	it('should not call onClick when disabled', async () => {
		const onClick = jest.fn();

		renderComponent(<ChipSkeleton label="Chip" onClick={onClick} disabled />);
		const chip = screen.getByRole('button', { hidden: true });
		await userEvent.click(chip);

		expect(onClick).not.toHaveBeenCalled();
	});

	it('should not call onClick for other keys', async () => {
		const onClick = jest.fn();

		renderComponent(<ChipSkeleton label="Chip" onClick={onClick} />);
		const chip = screen.getByRole('button');
		chip.focus();
		await userEvent.keyboard('[a]');

		expect(onClick).not.toHaveBeenCalled();
	});
});
