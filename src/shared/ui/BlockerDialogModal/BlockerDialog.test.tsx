import { fireEvent, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';

import { Translation } from '@/shared/config';
import { renderComponent } from '@/shared/libs';

import { BlockerDialog } from './BlockerDialogModal';

type BlockerDialogProps = ComponentProps<typeof BlockerDialog>;

const defaultProps: BlockerDialogProps = {
	isOpen: true,
	onClose: jest.fn(),
};

const renderBlockerDialog = (props: Partial<BlockerDialogProps> = {}) => {
	return renderComponent(<BlockerDialog {...defaultProps} {...props} />);
};

describe('BlockerDialog', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('должен корректно рендерить заголовок, дефолтное описание и кнопки действий при открытии', () => {
		renderBlockerDialog();

		expect(screen.getByText(Translation.MODAL_BLOCK_TITLE)).toBeInTheDocument();
		expect(screen.getByText(Translation.MODAL_BLOCK_DESCRIPTION)).toBeInTheDocument();
		expect(screen.getByText(Translation.MODAL_ACTIONS_OK)).toBeInTheDocument();
		expect(screen.getByText(Translation.MODAL_ACTIONS_CANCEL)).toBeInTheDocument();
	});

	test('не должен отображаться, если isOpen=false', () => {
		renderBlockerDialog({ isOpen: false });

		expect(screen.queryByText(Translation.MODAL_BLOCK_TITLE)).not.toBeInTheDocument();
	});

	test('должен отображать кастомное сообщение, если передан message', () => {
		const customMessage = 'Вы уверены, что хотите уйти?';

		renderBlockerDialog({ message: customMessage });

		expect(screen.getByText(customMessage)).toBeInTheDocument();
		expect(screen.queryByText(Translation.MODAL_BLOCK_DESCRIPTION)).not.toBeInTheDocument();
	});

	test('должен рендерить children, если asChild={true} и children переданы', () => {
		renderBlockerDialog({
			asChild: true,
			children: <span data-testid="custom-child">Кастомный контент</span>,
		});

		expect(screen.getByTestId('custom-child')).toBeInTheDocument();
		expect(screen.queryByText(Translation.MODAL_BLOCK_DESCRIPTION)).not.toBeInTheDocument();
	});

	test('должен отображать стандартное описание, если asChild={true}, но children не переданы', () => {
		renderBlockerDialog({
			asChild: true,
			children: undefined,
		});

		expect(screen.getByText(Translation.MODAL_BLOCK_DESCRIPTION)).toBeInTheDocument();
	});

	test('должен применять кастомный containerClassName', () => {
		const customClass = 'test-custom-class';

		renderBlockerDialog({
			containerClassName: customClass,
		});

		const contentWrapper = screen.getByText(Translation.MODAL_BLOCK_DESCRIPTION).parentElement;

		expect(contentWrapper).toHaveClass(customClass);
	});

	test('должен вызывать onOk при клике на основную кнопку', () => {
		const handleOk = jest.fn();

		renderBlockerDialog({ onOk: handleOk });

		fireEvent.click(screen.getByText(Translation.MODAL_ACTIONS_OK));

		expect(handleOk).toHaveBeenCalledTimes(1);
	});

	test('не должен падать при клике на основную кнопку, если onOk не передан', () => {
		renderBlockerDialog({ onOk: undefined });

		expect(() => {
			fireEvent.click(screen.getByText(Translation.MODAL_ACTIONS_OK));
		}).not.toThrow();
	});

	test('должен вызывать onCancel при клике на кнопку отмены', () => {
		const handleCancel = jest.fn();

		renderBlockerDialog({ onCancel: handleCancel });

		fireEvent.click(screen.getByText(Translation.MODAL_ACTIONS_CANCEL));

		expect(handleCancel).toHaveBeenCalledTimes(1);
	});

	test('не должен падать при клике на кнопку отмены, если onCancel не передан', () => {
		renderBlockerDialog({ onCancel: undefined });

		expect(() => {
			fireEvent.click(screen.getByText(Translation.MODAL_ACTIONS_CANCEL));
		}).not.toThrow();
	});
});
