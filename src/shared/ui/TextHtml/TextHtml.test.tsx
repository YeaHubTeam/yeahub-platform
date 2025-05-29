import { render, screen, waitFor } from '@testing-library/react';
import DOMPurify from 'dompurify';

import { TextHtml } from './TextHtml';
import styles from './TextHtml.module.css';

jest.mock('dompurify', () => ({
	sanitize: jest.fn((html) => html),
}));

describe('TextHtml component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders without crashing', async () => {
		render(<TextHtml html="<b>Test</b>" />);

		await waitFor(() => {
			const element = screen.getByText('Test');
			expect(element).toBeInTheDocument();
		});
	});

	it('applies additional className', () => {
		const { container } = render(<TextHtml html="Hello" className="test-class" />);
		const rootElement = container.firstChild;

		expect(rootElement).toHaveClass('test-class');
		expect(rootElement).toHaveClass(styles['text-html']);
	});

	it('renders sanitized HTML content', async () => {
		const rawHtml = '<script>alert("XSS")</script><b>Safe Content</b>';
		const sanitizedHtml = '<b>Safe Content</b>';
		(DOMPurify.sanitize as jest.Mock).mockReturnValueOnce(sanitizedHtml);

		render(<TextHtml html={rawHtml} />);

		await waitFor(() => {
			const element = screen.getByText('Safe Content');
			expect(element).toBeInTheDocument();
		});

		expect(DOMPurify.sanitize).toHaveBeenCalled();
	});

	it('sanitizes malicious HTML input', async () => {
		const rawHtml = '<img src="x" onerror="alert(1)" /><b>Test</b>';
		const sanitizedHtml = '<b>Test</b>';
		(DOMPurify.sanitize as jest.Mock).mockReturnValueOnce(sanitizedHtml);

		render(<TextHtml html={rawHtml} />);

		await waitFor(() => {
			const element = screen.getByText('Test');
			expect(element).toBeInTheDocument();
		});

		expect(DOMPurify.sanitize).toHaveBeenCalled();
	});
});
