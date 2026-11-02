import { screen, fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

import { TableCellEntityList } from './TableCellEntityList';
import styles from './TableCellEntityList.module.css';

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				'translation.expand': 'Expand',
				'translation.collapse': 'Collapse',
			};
			return translations[key] || key;
		},
	}),
}));

jest.mock('@/shared/config', () => ({
	i18Namespace: {
		translation: 'translation',
	},
	Translation: {
		EXPAND: 'translation.expand',
		COLLAPSE: 'translation.collapse',
	},
}));

jest.mock('react-router-dom', () => ({
	Link: ({
		children,
		to,
		className,
		'data-testid': testId,
	}: {
		children: ReactNode;
		to: string;
		className?: string;
		'data-testid'?: string;
	}) => (
		<a href={to} className={className} data-testid={testId}>
			{children}
		</a>
	),
}));

jest.mock('@/shared/ui/Button', () => ({
	Button: ({
		children,
		onClick,
		className,
		'data-testid': testId,
		suffix,
	}: {
		children: ReactNode;
		onClick?: () => void;
		className?: string;
		'data-testid'?: string;
		suffix?: ReactNode;
	}) => (
		<button onClick={onClick} className={className} data-testid={testId || 'Button'}>
			{children}
			{suffix}
		</button>
	),
}));

jest.mock('@/shared/ui/Icon', () => ({
	Icon: ({
		icon,
		size,
		className,
		'data-testid': testId,
	}: {
		icon: string;
		size: number;
		className?: string;
		'data-testid'?: string;
	}) => <svg data-testid={testId} data-icon={icon} data-size={size} className={className} />,
}));

jest.mock('@/shared/ui/Text', () => ({
	Text: ({
		children,
		variant,
		color,
		className,
		'data-testid': testId,
	}: {
		children: ReactNode;
		variant?: string;
		color?: string;
		className?: string;
		'data-testid'?: string;
	}) => {
		const Component = variant?.startsWith('head') ? 'h2' : 'p';
		return (
			<Component className={`${variant} text-${color} ${className || ''}`} data-testid={testId}>
				{children}
			</Component>
		);
	},
}));

jest.mock('@/shared/ui/Flex', () => ({
	Flex: ({
		children,
		direction,
		gap,
		align,
		'data-testid': testId,
	}: {
		children: ReactNode;
		direction?: string;
		gap?: string;
		align?: string;
		'data-testid'?: string;
	}) => (
		<div
			className={`flex align-${align} direction-${direction} gap${gap}`}
			data-testid={testId || 'Flex'}
		>
			{children}
		</div>
	),
}));

jest.mock('classnames', () => ({
	__esModule: true,
	default: (...args: unknown[]) => {
		return args
			.map((arg) => {
				if (typeof arg === 'string') return arg;
				if (typeof arg === 'object' && arg !== null) {
					return Object.entries(arg as Record<string, boolean>)
						.filter(([_, value]) => value)
						.map(([key]) => key)
						.join(' ');
				}
				return '';
			})
			.filter(Boolean)
			.join(' ');
	},
}));

jest.mock('@/shared/libs', () => ({
	route: (url: string, id: number) => `${url}${id}`,
}));

describe('TableCellEntityList', () => {
	const mockItems = [
		{ id: 1, title: 'Item 1' },
		{ id: 2, title: 'Item 2' },
		{ id: 3, title: 'Item 3' },
		{ id: 4, title: 'Item 4' },
		{ id: 5, title: 'Item 5' },
	];

	const defaultProps = {
		showCount: 2,
		items: mockItems,
	};

	const renderComponent = (component: ReactElement) => {
		return render(component);
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders component with correct structure', () => {
		renderComponent(<TableCellEntityList {...defaultProps} />);

		expect(screen.getByTestId('table-cell-entity-list')).toBeInTheDocument();
		expect(screen.getByTestId('table-cell-entity-list-items')).toBeInTheDocument();
	});

	test('shows only showCount items initially when no url provided', () => {
		renderComponent(<TableCellEntityList {...defaultProps} />);

		const itemsContainer = screen.getByTestId('table-cell-entity-list-items');
		expect(itemsContainer).toHaveTextContent('Item 1, Item 2');
		expect(itemsContainer).not.toHaveTextContent('Item 3');
	});

	test('shows all items when isOpen is true (button clicked)', () => {
		renderComponent(<TableCellEntityList {...defaultProps} />);

		const button = screen.getByTestId('table-cell-entity-list-button');
		fireEvent.click(button);

		const itemsContainer = screen.getByTestId('table-cell-entity-list-items');
		expect(itemsContainer).toHaveTextContent('Item 1, Item 2, Item 3, Item 4, Item 5');
	});

	test('toggles button text between Expand and Collapse', () => {
		renderComponent(<TableCellEntityList {...defaultProps} />);

		const buttonText = screen.getByTestId('table-cell-entity-list-button-text');
		expect(buttonText).toHaveTextContent('Expand');

		const button = screen.getByTestId('table-cell-entity-list-button');
		fireEvent.click(button);

		expect(buttonText).toHaveTextContent('Collapse');
	});

	test('toggles icon rotation class when opened/closed', () => {
		renderComponent(<TableCellEntityList {...defaultProps} />);

		const icon = screen.getByTestId('table-cell-entity-list-icon');

		expect(icon.className).not.toContain('opened');

		const button = screen.getByTestId('table-cell-entity-list-button');
		fireEvent.click(button);

		expect(icon.className).toContain('opened');
	});

	test('does not show button when items length <= showCount', () => {
		const propsWithFewItems = {
			...defaultProps,
			items: mockItems.slice(0, 2),
		};

		renderComponent(<TableCellEntityList {...propsWithFewItems} />);

		expect(screen.queryByTestId('table-cell-entity-list-button')).not.toBeInTheDocument();
	});

	describe('with url prop', () => {
		const urlWithId = '/test/';

		test('renders items as links when url is provided', () => {
			renderComponent(<TableCellEntityList {...defaultProps} url={urlWithId} />);

			const links = screen.getAllByTestId('table-cell-entity-list-link');
			expect(links).toHaveLength(2);
			expect(links[0]).toHaveAttribute('href', '/test/1');
			expect(links[1]).toHaveAttribute('href', '/test/2');
		});

		test('renders all items as links when opened', () => {
			renderComponent(<TableCellEntityList {...defaultProps} url={urlWithId} />);

			const button = screen.getByTestId('table-cell-entity-list-button');
			fireEvent.click(button);

			const links = screen.getAllByTestId('table-cell-entity-list-link');
			expect(links).toHaveLength(5);
			expect(links[4]).toHaveAttribute('href', '/test/5');
		});

		test('adds commas between links correctly', () => {
			renderComponent(<TableCellEntityList {...defaultProps} url={urlWithId} />);

			const itemsContainer = screen.getByTestId('table-cell-entity-list-items');
			expect(itemsContainer.innerHTML).toContain('</a><span>, </span><a');
		});

		test('does not add trailing comma after last item', () => {
			renderComponent(<TableCellEntityList {...defaultProps} url={urlWithId} />);

			const itemsContainer = screen.getByTestId('table-cell-entity-list-items');
			expect(itemsContainer.innerHTML).not.toMatch(/<\/a><span>, <\/span>$/);
		});
	});

	describe('without url prop', () => {
		test('renders items as comma-separated text', () => {
			renderComponent(<TableCellEntityList {...defaultProps} />);

			const itemsContainer = screen.getByTestId('table-cell-entity-list-items');
			expect(itemsContainer).toHaveTextContent('Item 1, Item 2');
			expect(screen.queryByTestId('table-cell-entity-list-link')).not.toBeInTheDocument();
		});

		test('updates text content correctly when toggled', () => {
			renderComponent(<TableCellEntityList {...defaultProps} />);

			const itemsContainer = screen.getByTestId('table-cell-entity-list-items');
			expect(itemsContainer).toHaveTextContent('Item 1, Item 2');

			const button = screen.getByTestId('table-cell-entity-list-button');
			fireEvent.click(button);

			expect(itemsContainer).toHaveTextContent('Item 1, Item 2, Item 3, Item 4, Item 5');
		});
	});

	test('handles empty items array', () => {
		renderComponent(<TableCellEntityList {...defaultProps} items={[]} />);

		expect(screen.getByTestId('table-cell-entity-list-items')).toBeEmptyDOMElement();
		expect(screen.queryByTestId('table-cell-entity-list-button')).not.toBeInTheDocument();
	});

	test('handles single item correctly', () => {
		const singleItem = [{ id: 1, title: 'Single Item' }];

		renderComponent(<TableCellEntityList {...defaultProps} items={singleItem} showCount={1} />);

		const itemsContainer = screen.getByTestId('table-cell-entity-list-items');
		expect(itemsContainer).toHaveTextContent('Single Item');
		expect(screen.queryByTestId('table-cell-entity-list-button')).not.toBeInTheDocument();
	});

	test('applies correct classes to link and button', () => {
		renderComponent(<TableCellEntityList {...defaultProps} url="/test/" />);

		const links = screen.getAllByTestId('table-cell-entity-list-link');
		expect(links[0]).toHaveClass(styles.link);

		const button = screen.getByTestId('table-cell-entity-list-button');
		expect(button).toHaveClass(styles.button);
	});

	test('maintains state correctly across multiple toggles', () => {
		renderComponent(<TableCellEntityList {...defaultProps} />);

		const button = screen.getByTestId('table-cell-entity-list-button');
		const buttonText = screen.getByTestId('table-cell-entity-list-button-text');
		const itemsContainer = screen.getByTestId('table-cell-entity-list-items');

		expect(buttonText).toHaveTextContent('Expand');
		expect(itemsContainer).toHaveTextContent('Item 1, Item 2');

		fireEvent.click(button);
		expect(buttonText).toHaveTextContent('Collapse');
		expect(itemsContainer).toHaveTextContent('Item 1, Item 2, Item 3, Item 4, Item 5');

		fireEvent.click(button);
		expect(buttonText).toHaveTextContent('Expand');
		expect(itemsContainer).toHaveTextContent('Item 1, Item 2');
	});
});
