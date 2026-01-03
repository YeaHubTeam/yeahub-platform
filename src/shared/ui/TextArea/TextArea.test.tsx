import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { textAreaClassName } from './constants';
import { TextArea } from './TextArea';

describe('TextArea component', () => {
	test('renders without crashing', () => {
		render(<TextArea />);
		const textarea = screen.getByRole('textbox');
		expect(textarea).toBeInTheDocument();
	});

	test('renders with placeholder', () => {
		const placeholder = 'Введите текст';
		render(<TextArea placeholder={placeholder} />);
		expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
	});

	test('handles value and onChange', async () => {
		const user = userEvent.setup();
		const handleChange = jest.fn();
		const testValue = 'Test input';

		render(<TextArea value={testValue} onChange={handleChange} />);

		const textarea = screen.getByRole('textbox');
		expect(textarea).toHaveValue(testValue);

		await user.clear(textarea);
		expect(handleChange).toHaveBeenCalled();

		handleChange.mockClear();

		await user.type(textarea, 'new text');

		expect(handleChange).toHaveBeenCalledTimes(8);
	});

	test('is disabled when disabled prop is true', () => {
		render(<TextArea disabled={true} />);
		const textarea = screen.getByRole('textbox');
		expect(textarea).toBeDisabled();
	});

	test('is disabled when isReadonly is true', () => {
		render(<TextArea isReadonly={true} />);
		const textarea = screen.getByRole('textbox');
		expect(textarea).toBeDisabled();
	});

	test('is disabled when either disabled or isReadonly is true', () => {
		const { rerender } = render(<TextArea disabled={true} isReadonly={false} />);
		expect(screen.getByRole('textbox')).toBeDisabled();

		rerender(<TextArea disabled={false} isReadonly={true} />);
		expect(screen.getByRole('textbox')).toBeDisabled();

		rerender(<TextArea disabled={true} isReadonly={true} />);
		expect(screen.getByRole('textbox')).toBeDisabled();
	});

	test('has error class when state="error"', () => {
		render(<TextArea state="error" />);
		const textarea = screen.getByRole('textbox');
		expect(textarea).toHaveClass(`${textAreaClassName}-error`);
	});

	test('has valid class when state="valid"', () => {
		render(<TextArea state="valid" />);
		const textarea = screen.getByRole('textbox');
		expect(textarea).toHaveClass(`${textAreaClassName}-valid`);
	});

	test('has default state when no state prop provided', () => {
		render(<TextArea />);
		const textarea = screen.getByRole('textbox');

		expect(textarea).not.toHaveClass(`${textAreaClassName}-error`);
		expect(textarea).not.toHaveClass(`${textAreaClassName}-valid`);
	});

	test('has disabled class when disabled or isReadonly', () => {
		const { rerender } = render(<TextArea disabled={true} />);
		expect(screen.getByRole('textbox')).toHaveClass(`${textAreaClassName}-disabled`);

		rerender(<TextArea isReadonly={true} />);
		expect(screen.getByRole('textbox')).toHaveClass(`${textAreaClassName}-disabled`);
	});

	test('passes additional props to textarea element', () => {
		const id = 'test-id';
		const name = 'test-name';
		const rows = 5;
		const maxLength = 100;

		render(<TextArea id={id} name={name} rows={rows} maxLength={maxLength} />);

		const textarea = screen.getByRole('textbox');
		expect(textarea).toHaveAttribute('id', id);
		expect(textarea).toHaveAttribute('name', name);
		expect(textarea).toHaveAttribute('rows', rows.toString());
		expect(textarea).toHaveAttribute('maxlength', maxLength.toString());
	});

	test('forwards ref to textarea element', () => {
		const ref = React.createRef<HTMLTextAreaElement>();
		render(<TextArea ref={ref} />);

		expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
		expect(ref.current?.tagName).toBe('TEXTAREA');
	});

	test('merges custom className with base className', () => {
		const customClass = 'custom-class';
		render(<TextArea className={customClass} />);

		const textarea = screen.getByRole('textbox');
		expect(textarea).toHaveClass(textAreaClassName);
		expect(textarea).toHaveClass(customClass);
	});

	test('has correct display name', () => {
		expect(TextArea.displayName).toBe('TextArea');
	});

	test('handles empty value', () => {
		render(<TextArea value="" readOnly />);
		expect(screen.getByRole('textbox')).toHaveValue('');
	});

	test('handles long text input', () => {
		const longText = 'a'.repeat(1000);
		render(<TextArea value={longText} readOnly />);
		expect(screen.getByRole('textbox')).toHaveValue(longText);
	});

	test('does not have disabled class when not disabled or readonly', () => {
		render(<TextArea disabled={false} isReadonly={false} />);
		const textarea = screen.getByRole('textbox');
		expect(textarea).not.toHaveClass(`${textAreaClassName}-disabled`);
	});

	test('handles undefined value', () => {
		render(<TextArea value={undefined} />);
		const textarea = screen.getByRole('textbox');
		expect(textarea).toBeInTheDocument();
		expect(textarea).toHaveValue('');
	});

	test('default state prop is "default"', () => {
		const { container } = render(<TextArea />);
		const textarea = container.querySelector('textarea');
		expect(textarea).not.toHaveClass(`${textAreaClassName}-error`);
		expect(textarea).not.toHaveClass(`${textAreaClassName}-valid`);
	});

	test('can be focused and blurred', async () => {
		const user = userEvent.setup();
		render(<TextArea />);
		const textarea = screen.getByRole('textbox');

		await user.click(textarea);
		expect(textarea).toHaveFocus();

		await user.tab();
		expect(textarea).not.toHaveFocus();
	});

	test('passes readOnly prop to textarea element', () => {
		render(<TextArea readOnly />);
		const textarea = screen.getByRole('textbox');
		expect(textarea).toHaveAttribute('readonly');
	});
});
