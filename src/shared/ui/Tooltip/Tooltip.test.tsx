import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '@/shared/libs';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
	test('renders children', () => {
		renderComponent(
			<Tooltip title="Подсказка">
				<button>Наведи на меня</button>
			</Tooltip>,
		);

		expect(screen.getByRole('button', { name: 'Наведи на меня' })).toBeInTheDocument();
	});

	test('shows tooltip on hover', async () => {
		const user = userEvent.setup();

		renderComponent(<Tooltip title="Подсказка">Наведи на меня</Tooltip>);

		const trigger = screen.getByText('Наведи на меня');

		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

		await user.hover(trigger);

		expect(screen.getByRole('tooltip')).toBeInTheDocument();
		expect(screen.getByText('Подсказка')).toBeInTheDocument();
	});

	test('does not show tooltip when disabled', async () => {
		const user = userEvent.setup();

		renderComponent(
			<Tooltip title="Подсказка" shouldShowTooltip={false}>
				Наведи на меня
			</Tooltip>,
		);

		const trigger = screen.getByText('Наведи на меня');

		await user.hover(trigger);

		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
	});

	test('renders tooltip with aria label', async () => {
		const user = userEvent.setup();

		renderComponent(
			<Tooltip title="Подсказка" ariaLabel="Описание подсказки">
				Наведи на меня
			</Tooltip>,
		);

		const trigger = screen.getByText('Наведи на меня');

		await user.hover(trigger);

		expect(screen.getByRole('tooltip', { name: 'Описание подсказки' })).toBeInTheDocument();
	});

	test('applies custom className', async () => {
		const user = userEvent.setup();

		renderComponent(
			<Tooltip title="Подсказка" className="custom-tooltip">
				Наведи на меня
			</Tooltip>,
		);

		const trigger = screen.getByText('Наведи на меня');

		await user.hover(trigger);

		expect(screen.getByRole('tooltip')).toHaveClass('custom-tooltip');
	});

	test('uses color as base color when color is not mapped', async () => {
		const user = userEvent.setup();

		renderComponent(
			<Tooltip title="Подсказка" color="green">
				Наведи на меня
			</Tooltip>,
		);

		await user.hover(screen.getByText('Наведи на меня'));

		const tooltip = screen.getByRole('tooltip');
		const arrowPath = tooltip.querySelector('path');

		expect(arrowPath).toHaveAttribute('stroke', 'var(--color-green-600)');
	});
});
