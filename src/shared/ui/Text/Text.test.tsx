import { render, screen } from '@testing-library/react';
import React from 'react';

import { Text } from './Text';
import { TextSkeleton } from './Text.skeleton';

describe('Text component', () => {
	test('renders without errors', () => {
		render(<Text variant="body1">Hello World</Text>);
		expect(screen.getByText('Hello World')).toBeInTheDocument();
	});

	test('renders correct tag based on variant', () => {
		render(<Text variant="head2">Heading 2</Text>);
		expect(screen.getByText('Heading 2').tagName).toBe('H2');
	});

	test('uses h1 when isMainTitle is true', () => {
		render(
			<Text variant="body1" isMainTitle>
				Hello
			</Text>,
		);
		expect(screen.getByText('Hello').tagName).toBe('H1');
	});

	test('adds correct classes for variant and color', () => {
		render(
			<Text variant="body1" color="black-700">
				Styled Text
			</Text>,
		);
		const element = screen.getByText('Styled Text');
		expect(element).toHaveClass('text-black-700');
		expect(element).toHaveClass('body1');
	});

	test('adds class for maxRows when provided', () => {
		render(
			<Text variant="body1" maxRows={3}>
				Max Rows
			</Text>,
		);
		expect(screen.getByText('Max Rows')).toHaveClass('text-rows-3');
	});

	test('passes custom className prop', () => {
		render(
			<Text variant="body1" className="custom-class">
				Custom
			</Text>,
		);
		expect(screen.getByText('Custom')).toHaveClass('custom-class');
	});

	test('applies width style when provided', () => {
		render(
			<Text variant="body1" width="200px">
				Width Test
			</Text>,
		);
		expect(screen.getByText('Width Test')).toHaveStyle('width: 200px');
	});

	test('adds "limited" class when isLimitSize is true', () => {
		render(
			<Text variant="body1" isLimitSize>
				Limited size
			</Text>,
		);
		expect(screen.getByText('Limited size')).toHaveClass('limited');
	});

	test('adds "no-wrap" class when isNoWrap is true', () => {
		render(
			<Text variant="body1" isNoWrap>
				No wrap
			</Text>,
		);
		expect(screen.getByText('No wrap')).toHaveClass('no-wrap');
	});

	test('sets data-testid when dataTestId prop is provided', () => {
		render(
			<Text variant="body1" dataTestId="text-id">
				Data ID
			</Text>,
		);
		expect(screen.getByTestId('text-id')).toBeInTheDocument();
	});

	test('renders <p> tag for body variants', () => {
		render(<Text variant="body1">Paragraph</Text>);
		expect(screen.getByText('Paragraph').tagName).toBe('P');
	});

	test('forwards ref to DOM element', () => {
		const ref = React.createRef<HTMLParagraphElement>();
		render(
			<Text variant="body1" ref={ref}>
				Ref test
			</Text>,
		);
		expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
		expect(ref.current?.textContent).toBe('Ref test');
	});

	test('combines multiple props correctly', () => {
		render(
			<Text variant="body1" color="black-700" maxRows={2} isLimitSize className="extra" width={150}>
				Combo
			</Text>,
		);
		const el = screen.getByText('Combo');
		expect(el).toHaveClass('text-black-700', 'text-rows-2', 'limited', 'extra');
		expect(el).toHaveStyle('width: 150px');
	});
});

describe('TextSkeleton component', () => {
	test('renders with correct width / height and data-testid', () => {
		render(<TextSkeleton variant="head1" width={120} dataTestId="skeleton" />);
		const el = screen.getByTestId('skeleton');

		expect(el).toHaveStyle('height: 69px');
		expect(el).toHaveStyle('width: 120px');
	});

	test('passes custom className', () => {
		render(<TextSkeleton variant="body3" width={80} className="custom" dataTestId="skeleton" />);
		const el = screen.getByTestId('skeleton');
		expect(el).toHaveClass('custom');
	});

	test.each([
		['head2', 40 * 1.15],
		['body1', 12 * 1.2],
	] as const)('computes correct height for variant %s', (variant, expectedHeight) => {
		render(<TextSkeleton variant={variant} width={50} dataTestId="sk" />);
		expect(screen.getByTestId('sk')).toHaveStyle(`height: ${expectedHeight}px`);
	});
});
