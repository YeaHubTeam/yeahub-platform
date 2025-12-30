import { screen } from '@testing-library/react';
import uE from '@testing-library/user-event';

import { renderComponent } from '@/shared/libs';

import { Chip } from './Chip';
import { ChipSkeleton } from './Chip.skeleton';
import { ChipVariants, ChipThemes } from './constants';
import { chipTestIDs } from './constants';
import { ChipProps, ChipVariant, ChipTheme } from './types';

const render = (props?: ChipProps) => {
	renderComponent(<Chip {...props} />);
};

const chipVariants = Object.keys(ChipVariants) as ChipVariant[];
const chipThemes = Object.keys(ChipThemes) as ChipTheme[];

describe('Chip', () => {
	const userEvent = uE.setup();

	describe.each(chipVariants)('for "%s" variant', (variant) => {
		beforeEach(() => {
			render({ variant: variant });
		});

		it('renders with correct wrapper and variant class', () => {
			const chip = screen.getByTestId(chipTestIDs.chip);

			expect(chip).toHaveClass('chip-wrapper');
			expect(chip).toHaveClass(`${variant}`);
		});
	});

	describe.each(chipThemes)('for "%s" theme', (theme) => {
		beforeEach(() => {
			render({ theme: theme });
		});

		it('should render with correct theme class', () => {
			const chip = screen.getByTestId(chipTestIDs.chip);

			expect(chip).toHaveClass(`chip-${theme}`);
		});
	});

	it('should render with custom className', () => {
		render({ className: 'customClassName' });

		const chip = screen.getByTestId(chipTestIDs.chip);

		expect(chip).toHaveClass('customClassName');
	});

	it('should render with correct className with active prop', () => {
		render({ active: true });

		const chip = screen.getByTestId(chipTestIDs.chip);
		expect(chip).toHaveClass('chip-active');
	});

	it('should render with correct className with onClick prop', () => {
		const fn = jest.fn();
		render({ onClick: fn });

		const chip = screen.getByTestId(chipTestIDs.chip);
		expect(chip).toHaveClass('chip-clickable');
	});

	it('should render prefix when prop is provided', () => {
		render({ prefix: 'prefix' });

		const prefix = screen.getByTestId(chipTestIDs.prefix);

		expect(prefix).toBeInTheDocument();
		expect(prefix).toHaveTextContent('prefix');
		expect(prefix).toHaveClass('chip-prefix');
	});

	it('should not render prefix without prop', () => {
		render();

		const prefix = screen.queryByTestId(chipTestIDs.prefix);

		expect(prefix).not.toBeInTheDocument();
	});

	it('should render prefix with gap className (with label)', () => {
		render({ prefix: 'prefix', label: 'label' });

		const prefix = screen.queryByTestId(chipTestIDs.prefix);

		expect(prefix).toHaveClass('gap');
	});

	it('should render label when prop is provided', () => {
		render({ label: chipTestIDs.labelText });

		const label = screen.getByTestId(chipTestIDs.labelText);

		expect(label).toBeInTheDocument();
		expect(label).toHaveClass('body3-accent');
		expect(label).toHaveClass('text-black-800');
		expect(label).toHaveTextContent('label');
		expect(label).toHaveClass('chip-label');
	});

	it('label should not be rendered without prop', () => {
		render();

		const label = screen.queryByTestId(chipTestIDs.labelText);

		expect(label).not.toBeInTheDocument();
	});

	it('should call onClick when clicked (not disabled)', async () => {
		const fn = jest.fn();
		render({ onClick: fn });

		const chip = screen.getByTestId(chipTestIDs.chip);

		await userEvent.click(chip);
		expect(fn).toHaveBeenCalled();
	});

	it('should call onClick when pressing Enter or Space (not disabled)', async () => {
		const fn = jest.fn();
		render({ onClick: fn });

		const chip = screen.getByTestId(chipTestIDs.chip);

		await userEvent.click(chip);
		await userEvent.keyboard('[Enter]');
		await userEvent.keyboard('[Space]');

		expect(fn).toHaveBeenCalledTimes(3);
	});

	it('should not call onClick for other keys', async () => {
		const onClick = jest.fn();

		render({ onClick: onClick });
		const chip = screen.getByRole('button');
		chip.focus();

		await userEvent.keyboard('[a]');
		expect(onClick).not.toHaveBeenCalled();
	});

	describe('disabled', () => {
		it('should render chip with appropriate classNames and attributes', () => {
			render({ disabled: true });

			const chip = screen.getByTestId(chipTestIDs.chip);

			expect(chip).toHaveClass('chip-disabled');
			expect(chip).toHaveAttribute('aria-disabled', 'true');
			expect(chip).toHaveAttribute('aria-hidden');
		});

		it('should not not call onClick when disabled', async () => {
			const fn = jest.fn();

			render({ onClick: fn, disabled: true });

			const chip = screen.getByTestId(chipTestIDs.chip);
			await userEvent.click(chip);

			expect(fn).not.toHaveBeenCalled();
		});

		it('should not call onClick on keyboard press (Enter and Space)', async () => {
			const fn = jest.fn();

			render({ disabled: true, onClick: fn });

			const chip = screen.getByTestId(chipTestIDs.chip);
			chip.focus();

			await userEvent.keyboard('[Enter]');
			await userEvent.keyboard(' ');

			expect(fn).not.toHaveBeenCalled();
		});

		it('should render delete icon and call onDelete', async () => {
			const onDelete = jest.fn();

			render({ onDelete: onDelete });

			const icon = screen.getByTestId(chipTestIDs.icon);

			await userEvent.click(icon);

			expect(icon).toBeInTheDocument();
			expect(onDelete).toHaveBeenCalledTimes(1);
		});

		it('should render delete icon with appropriate styles when disabled', () => {
			const onDelete = jest.fn();

			render({ onDelete: onDelete, disabled: true });
			const icon = screen.getByTestId(chipTestIDs.icon);

			expect(icon).toHaveAttribute('color', expect.stringContaining('black-100'));
		});
	});

	it('should render icon with appropriate class,color and call onClick (with onDelete)', async () => {
		const onClick = jest.fn();
		const onDelete = jest.fn();

		render({ onClick: onClick, onDelete: onDelete });

		const icon = screen.getByTestId(chipTestIDs.icon);
		await userEvent.click(icon);

		expect(icon).toBeInTheDocument();
		expect(icon).toHaveClass('chip-delete-icon');
		expect(icon).toHaveAttribute('color', expect.stringContaining('red-600'));
		expect(onClick).toHaveBeenCalled();
	});

	it('should not render Icon without onDelete prop', () => {
		render();

		const icon = screen.queryByTestId(chipTestIDs.icon);

		expect(icon).not.toBeInTheDocument();
	});

	it('should render skeleton', () => {
		renderComponent(<ChipSkeleton data-testId={chipTestIDs.skeleton} />);

		const chipSkeleton = screen.getByTestId(chipTestIDs.skeleton);
		expect(chipSkeleton).toBeInTheDocument();
	});
});
