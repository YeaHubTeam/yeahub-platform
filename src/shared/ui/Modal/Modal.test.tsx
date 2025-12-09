import { cleanup, fireEvent, screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import {
	closeIconColors,
	modalTestIds,
	outlineButtonVariants,
	primaryButtonVariants,
	titleColors,
} from './constants';
import { Modal } from './Modal';
import type { ModalProps, ModalVariant, RequiredModalProps } from './ModalTypes';

type OverrideProps = Partial<ModalProps>;

const onClose = jest.fn();

const render = (props: OverrideProps = {}) => {
	const defaultProps: RequiredModalProps = {
		isOpen: true,
		onClose,
	};
	renderComponent(
		<Modal {...defaultProps} {...props}>
			Modal Content
		</Modal>,
	);
};

describe('Modal', () => {
	describe('Rendering', () => {
		test('renders modal with required props', () => {
			render();

			expect(screen.getByTestId(modalTestIds.modal)).toBeInTheDocument();
			expect(screen.getByText('Modal Content')).toBeInTheDocument();
			expect(screen.getByTestId(modalTestIds.modalCloseIcon)).toBeInTheDocument();
			expect(screen.queryByTestId(modalTestIds.modalTitle)).not.toBeInTheDocument();
			expect(screen.queryByTestId(modalTestIds.modalPrimaryButton)).not.toBeInTheDocument();
			expect(screen.queryByTestId(modalTestIds.modalOutlineButton)).not.toBeInTheDocument();
		});

		test('renders with title', () => {
			render({ title: 'Modal Title' });

			expect(screen.getByTestId(modalTestIds.modalTitle)).toBeInTheDocument();
			expect(screen.getByText('Modal Title')).toBeInTheDocument();
		});

		test('render with primary button', () => {
			render({ buttonPrimaryText: 'Primary Text' });

			expect(screen.getByTestId(modalTestIds.modalPrimaryButton)).toBeInTheDocument();
			expect(screen.getByText('Primary Text')).toBeInTheDocument();
		});

		test('render with outline button', () => {
			render({ buttonOutlineText: 'Outline Text' });

			expect(screen.getByTestId(modalTestIds.modalOutlineButton)).toBeInTheDocument();
			expect(screen.getByText('Outline Text')).toBeInTheDocument();
		});

		test('render with primary and outline buttons', () => {
			render({
				buttonPrimaryText: 'Primary Text',
				buttonOutlineText: 'Outline Text',
			});

			expect(screen.getByTestId(modalTestIds.modalPrimaryButton)).toBeInTheDocument();
			expect(screen.getByText('Primary Text')).toBeInTheDocument();
			expect(screen.getByTestId(modalTestIds.modalOutlineButton)).toBeInTheDocument();
			expect(screen.getByText('Outline Text')).toBeInTheDocument();
		});

		test('close icon button should not be rendered when withCloseIcon is false', () => {
			render({ withCloseIcon: false });

			expect(screen.queryByTestId(modalTestIds.modalCloseIcon)).not.toBeInTheDocument();
		});

		test('merges custom className with internal classes', () => {
			render({ className: 'custom-class' });

			expect(screen.getByTestId(modalTestIds.modalContentWrapper)).toHaveClass('custom-class');
		});

		test.each<ModalVariant>(['default', 'error'])('renders %s variant correctly', (variant) => {
			render({
				title: 'Modal Title',
				variant: variant,
				buttonPrimaryText: 'Primary Text',
				buttonOutlineText: 'Outline Text',
			});

			expect(screen.getByTestId(modalTestIds.modal)).toHaveClass(`${variant}-modal`);

			expect(screen.getByTestId(modalTestIds.modalTitle)).toHaveClass(
				`text-${titleColors[variant]}`,
			);
			expect(screen.getByTestId(modalTestIds.modalCloseIcon)).toHaveStyle({
				color: closeIconColors[variant],
			});
			expect(screen.getByTestId(modalTestIds.modalPrimaryButton)).toHaveClass(
				`button-${primaryButtonVariants[variant]}`,
			);
			expect(screen.getByTestId(modalTestIds.modalOutlineButton)).toHaveClass(
				`button-${outlineButtonVariants[variant]}`,
			);
		});

		test('sets overflow to hidden when modal is open', () => {
			render();

			expect(document.body.style.overflow).toBe('hidden');
			expect(screen.getByTestId(modalTestIds.modal)).toBeInTheDocument();
		});

		test('resets overflow when modal is closed', () => {
			render({ isOpen: false });

			expect(document.body.style.overflow).toBe('');
			expect(screen.queryByTestId(modalTestIds.modal)).not.toBeInTheDocument();
		});

		test('resets overflow on unmount when modal is open', () => {
			render();

			expect(document.body.style.overflow).toBe('hidden');

			cleanup();
			expect(document.body.style.overflow).toBe('');
		});
	});

	describe('Interactions', () => {
		const onPrimaryClick = jest.fn();
		const onOutlineClick = jest.fn();

		test('calls buttonPrimaryClick when primary button is clicked', () => {
			render({ buttonPrimaryText: 'Primary Text', buttonPrimaryClick: onPrimaryClick });

			fireEvent.click(screen.getByTestId(modalTestIds.modalPrimaryButton));
			expect(onPrimaryClick).toHaveBeenCalled();
		});

		test('calls buttonOutlineClick when outline button is clicked', () => {
			render({ buttonOutlineText: 'Outline Text', buttonOutlineClick: onOutlineClick });

			fireEvent.click(screen.getByTestId(modalTestIds.modalOutlineButton));
			expect(onOutlineClick).toHaveBeenCalled();
		});

		test('primary button should be disabled when buttonPrimaryDisabled is true', () => {
			render({
				buttonPrimaryText: 'Primary Text',
				buttonPrimaryDisabled: true,
			});

			expect(screen.getByTestId(modalTestIds.modalPrimaryButton)).toBeDisabled();
		});

		test('outline button should be disabled when buttonOutlineDisabled is true', () => {
			render({
				buttonOutlineText: 'Outline Text',
				buttonOutlineDisabled: true,
			});

			expect(screen.getByTestId(modalTestIds.modalOutlineButton)).toBeDisabled();
		});

		test('calls onClose when close icon button is clicked', () => {
			render();

			fireEvent.click(screen.getByTestId(modalTestIds.modalCloseIcon));
			expect(onClose).toHaveBeenCalled();
		});

		test('calls onClose when pressing Escape key', () => {
			render();

			fireEvent.keyDown(screen.getByTestId(modalTestIds.modalOverlay), { key: 'Escape' });
			expect(onClose).toHaveBeenCalled();
		});

		test('does not call onClose when pressing non-Escape key', () => {
			render();

			fireEvent.keyDown(screen.getByTestId(modalTestIds.modalOverlay), { key: 'Enter' });
			expect(onClose).not.toHaveBeenCalled();
		});

		test('calls onClose when clicking outside modal content (overlay)', () => {
			render();

			fireEvent.click(screen.getByTestId(modalTestIds.modalOverlay));
			expect(onClose).toHaveBeenCalled();
		});

		test('does not call onClose when clicking inside modal content', () => {
			render();

			fireEvent.click(screen.getByTestId(modalTestIds.modal));
			expect(onClose).not.toHaveBeenCalled();
		});
	});
});
