import { render, screen } from '@testing-library/react';
import DOMPurify from 'dompurify';

import { TextHtml } from './TextHtml';

jest.mock('dompurify', () => ({
	sanitize: jest.fn((html) => html),
}));

describe('TextHtml component', () => {
	it('renders without crashing', () => {
		render(<TextHtml html="<b>Test</b>" />);
		const element = screen.getByText('Test');
		expect(element).toBeInTheDocument();
	});

	it('applies additional className', () => {
		render(<TextHtml html="Hello" className="test-class" />);
		const preElement = screen.getByRole('presentation');
		expect(preElement).toHaveClass('test-class');
	});

	it('renders sanitized HTML content', () => {
		const rawHtml = '<script>alert("XSS")</script><b>Safe Content</b>';
		const sanitizedHtml = '<b>Safe Content</b>';
		(DOMPurify.sanitize as jest.Mock).mockReturnValueOnce(sanitizedHtml);

		render(<TextHtml html={rawHtml} />);
		const element = screen.getByText('Safe Content');

		expect(DOMPurify.sanitize).toHaveBeenCalledWith(rawHtml);
		expect(element).toBeInTheDocument();
	});

	it('sanitizes malicious HTML input', () => {
		const rawHtml = '<img src="x" onerror="alert(1)" /><b>Test</b>';
		const sanitizedHtml = '<b>Test</b>';
		(DOMPurify.sanitize as jest.Mock).mockReturnValueOnce(sanitizedHtml);

		render(<TextHtml html={rawHtml} />);
		const element = screen.getByText('Test');

		expect(DOMPurify.sanitize).toHaveBeenCalledWith(rawHtml);
		expect(element).toBeInTheDocument();
	});
});
