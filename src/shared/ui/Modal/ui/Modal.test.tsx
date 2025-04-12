import { fireEvent, screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { Modal } from './Modal';

describe('Modal', () => {
	test('render open modal', () => {
		renderComponent(
			<Modal title="modal" isOpen={true} onClose={() => {}}>
				Text
			</Modal>,
		);
		const modal = screen.getByTestId('Modal');
		expect(modal).toBeInTheDocument();
	});

	test('render close modal', () => {
		renderComponent(
			<Modal title="text" isOpen={false} onClose={() => {}}>
				Text
			</Modal>,
		);
		const closeModal = screen.queryByTestId('Modal');
		expect(closeModal).not.toHaveClass('modal-open');
	});

	test('close overlay modal', () => {
		const close = jest.fn();
		renderComponent(
			<Modal title="modal" isOpen={true} onClose={close}>
				Text
			</Modal>,
		);
		const overlayModal = screen.getByRole('button');
		fireEvent.click(overlayModal);
		expect(close).toHaveBeenCalled();
	});

	test('close modal when clicked close button', () => {
		const close = jest.fn();
		renderComponent(
			<Modal title="modal" isOpen={true} onClose={close}>
				Text
			</Modal>,
		);

		const closeButton = screen.getByRole('button', {
			name: /закрыть модальное окно/i,
		});

		fireEvent.click(closeButton);
		expect(close).toHaveBeenCalled();
	});

	test('close modal when Escape is pressed', () => {
		const close = jest.fn();
		renderComponent(
			<Modal title="modal" isOpen={true} onClose={close}>
				Text
			</Modal>,
		);
		const modal = screen.getByTestId('Modal');
		fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' });
		expect(close).toHaveBeenCalled();
	});

	test('should render buttons if button texts are provided', () => {
		const primaryButtonClick = jest.fn();
		const outlineButtonClick = jest.fn();
		renderComponent(
			<Modal
				title="modal"
				isOpen={true}
				onClose={() => {}}
				buttonPrimaryText="Primary"
				buttonOutlineText="Outline"
				buttonPrimaryClick={primaryButtonClick}
				buttonOutlineClick={outlineButtonClick}
			>
				Text
			</Modal>,
		);
		const primaryButton = screen.getByText('Primary');
		const outlineButton = screen.getByText('Outline');
		expect(primaryButton).toBeInTheDocument();
		expect(outlineButton).toBeInTheDocument();
	});

	test('should not render buttons if no button texts are provided', () => {
		renderComponent(
			<Modal title="modal" isOpen={true} onClose={() => {}}>
				Text
			</Modal>,
		);
		const primaryButton = screen.queryByText('Primary');
		const outlineButton = screen.queryByText('Outline');
		expect(primaryButton).not.toBeInTheDocument();
		expect(outlineButton).not.toBeInTheDocument();
	});

	test('render modal', () => {
		renderComponent(
			<Modal title="modal" isOpen={true} onClose={() => {}}>
				Text
			</Modal>,
		);
		const modal = screen.getByTestId('Modal');
		expect(modal).toBeInTheDocument();
	});

	test('modal title', () => {
		renderComponent(
			<Modal title="Modal" isOpen={true} onClose={() => {}}>
				Text
			</Modal>,
		);
		const titleModal = screen.getByText('Modal');
		expect(titleModal).toBeInTheDocument();
	});
});
