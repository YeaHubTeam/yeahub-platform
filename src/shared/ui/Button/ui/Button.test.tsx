import { fireEvent, screen } from '@testing-library/react';
import { createRef } from 'react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { ButtonProps } from '../model/types';

import { Button } from './Button';

describe('Button', () => {
	test('render', () => {
		renderComponent(<Button />);
		const button = screen.getByTestId('Button');
		expect(button).toBeInTheDocument();
	});

	test.each<ButtonProps['size']>(['small', 'large', 'medium'])(
		'renders %s size correctly',
		(size) => {
			renderComponent(<Button size={size}>Test</Button>);
			expect(screen.getByTestId('Button')).toHaveClass(`button-${size}`);
		},
	);

	test.each<ButtonProps['variant']>([
		'primary',
		'secondary',
		'outline',
		'tertiary',
		'destructive',
		'destructive-secondary',
		'destructive-outline',
		'destructive-tertiary',
	])('renders %s variant correctly', (variant) => {
		renderComponent(<Button variant={variant}>Test</Button>);
		expect(screen.getByTestId('Button')).toHaveClass(`button-${variant}`);
	});

	test.each<ButtonProps['size']>(['small', 'large', 'medium'])(
		'renders %s size correctly',
		(size) => {
			renderComponent(<Button size={size}>Test</Button>);
			expect(screen.getByTestId('Button')).toHaveClass(`button-${size}`);
		},
	);

	test('merges custom className with internal classes', () => {
		renderComponent(<Button className="custom-class">Test</Button>);
		expect(screen.getByTestId('Button')).toHaveClass('custom-class');
	});

	test('applies fullWidth class when fullWidth is true', () => {
		renderComponent(<Button fullWidth>Test</Button>);
		expect(screen.getByTestId('Button')).toHaveClass('button-full');
	});

	test('applies destructive styles when destructive is true', () => {
		renderComponent(<Button destructive>Test</Button>);
		expect(screen.getByTestId('Button')).toHaveClass('button');
	});

	test('applies link-destructive for link variant', () => {
		renderComponent(
			<Button variant="link" destructive>
				Test
			</Button>,
		);
		const link = screen.getByTestId('Button');
		expect(link).toHaveClass('a-link-destructive');
		expect(link.tagName.toLowerCase()).toBe('a');
	});

	test('correctly renders preffix and suffix nodes', () => {
		renderComponent(
			<Button
				preffix={<span data-testid="preffix">Pre</span>}
				suffix={<span data-testid="suffix">Suf</span>}
			>
				Test
			</Button>,
		);

		const button = screen.getByTestId('Button');

		expect(button).toHaveTextContent('PreTestSuf');
		expect(screen.getByTestId('preffix')).toBeInTheDocument();
		expect(screen.getByTestId('suffix')).toBeInTheDocument();
	});

	test('renders badge when provided', () => {
		renderComponent(<Button badge="5">Test</Button>);
		expect(screen.getByText('5')).toBeInTheDocument();
	});

	test('does not render badge when it is "0"', () => {
		renderComponent(<Button badge="0">Test</Button>);
		expect(screen.queryByText('0')).not.toBeInTheDocument();
	});

	test('passes additional props to the element', () => {
		renderComponent(<Button data-custom="value">Test</Button>);
		expect(screen.getByTestId('Button')).toHaveAttribute('data-custom', 'value');
	});

	test('button is disabled when disabled prop is true', () => {
		renderComponent(<Button disabled>Test</Button>);
		expect(screen.getByTestId('Button')).toBeDisabled();
	});

	test('forwards ref correctly', () => {
		const ref = createRef<HTMLButtonElement>();
		renderComponent(<Button ref={ref}>Test</Button>);
		expect(ref.current).toBeInstanceOf(HTMLButtonElement);
	});

	test('triggers onClick when clicked', () => {
		const handleClick = jest.fn();
		renderComponent(<Button onClick={handleClick}>Click me</Button>);

		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test('does not trigger onClick when disabled', () => {
		const handleClick = jest.fn();
		renderComponent(
			<Button disabled onClick={handleClick}>
				Disabled
			</Button>,
		);

		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});
});
