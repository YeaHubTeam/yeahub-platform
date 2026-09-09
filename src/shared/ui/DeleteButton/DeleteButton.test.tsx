import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Translation } from '@/shared/config';
import { renderComponent } from '@/shared/libs';
import type { TooltipProps } from '@/shared/ui/Tooltip';

import { DeleteButton, DeleteButtonProps } from './DeleteButton';

type OverrideProps = Partial<DeleteButtonProps>;

jest.mock('@/shared/ui/Tooltip', () => ({
	Tooltip: ({ children, placement, shouldShowTooltip, title, ...rest }: TooltipProps) => (
		<>
			{children}

			{shouldShowTooltip && (
				<div role="tooltip" data-placement={placement} {...rest}>
					{title}
				</div>
			)}
		</>
	),
}));

const renderDeleteButton = (props: OverrideProps = {}) => {
	const { onDelete = jest.fn(), ...rest } = props;

	renderComponent(<DeleteButton onDelete={onDelete} {...rest} />);

	return { onDelete, user: userEvent.setup() };
};

describe('DeleteButton', () => {
	test('render button text', () => {
		renderDeleteButton();

		expect(screen.getByText(Translation.DELETE)).toBeInTheDocument();
	});

	test('render tooltip title when button disabled', async () => {
		renderDeleteButton({ disabled: true });

		const tooltip = await screen.findByRole('tooltip');
		expect(tooltip).toHaveTextContent(Translation.TOOLTIP_COLLECTION_DISABLED_INFO);
	});

	test('render without isDetailPage prop', async () => {
		renderDeleteButton({ disabled: true });

		const tooltip = await screen.findByRole('tooltip');
		expect(tooltip).toHaveAttribute('data-placement', 'left');
	});

	test('render with isDetailPage equal true', async () => {
		renderDeleteButton({ disabled: true, isDetailPage: true });

		const tooltip = await screen.findByRole('tooltip');
		expect(tooltip).toHaveAttribute('data-placement', 'bottom-start');
	});

	test('not render Tooltip when showTooltip equal false', () => {
		renderDeleteButton({ disabled: true, showTooltip: false });

		const tooltip = screen.queryByRole('tooltip');
		expect(tooltip).not.toBeInTheDocument();
	});

	test('render modal message after click delete button', async () => {
		const { user } = renderDeleteButton();

		await user.click(screen.getByRole('button'));
		expect(screen.getByText(Translation.MODAL_DELETE_TITLE)).toBeInTheDocument();
	});

	test('call onDelete when confirm delete in modal', async () => {
		const { onDelete, user } = renderDeleteButton();

		await user.click(screen.getByRole('button'));

		const confirmButton = screen.getByRole('button', {
			name: Translation.MODAL_ACTIONS_OK,
		});

		await user.click(confirmButton);

		expect(onDelete).toHaveBeenCalledTimes(1);
	});

	test('does not call onDelete when cancel delete in modal', async () => {
		const { onDelete, user } = renderDeleteButton();

		await user.click(screen.getByRole('button'));

		const cancelButton = screen.getByRole('button', {
			name: Translation.MODAL_ACTIONS_CANCEL,
		});

		await user.click(cancelButton);

		expect(onDelete).not.toHaveBeenCalled();
	});
});
