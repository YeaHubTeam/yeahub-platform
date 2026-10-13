import { fireEvent, screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';
import type { ChipProps } from '@/shared/ui/Chip';
import type { DropdownProps } from '@/shared/ui/Dropdown';
import type { OptionProps } from '@/shared/ui/Dropdown';

import { selectWithChipsTestIds } from './constants';
import { SelectWithChips } from './SelectWithChips';
import type { SelectWithChipsProps as SelectWithChipsGenericProps } from './SelectWithChips';
import styles from './SelectWithChips.module.css';

type SelectWithChipsProps = SelectWithChipsGenericProps<
	{ id: string; title: string; imageSrc?: string | null },
	string
>;

jest.mock('@/shared/ui/Dropdown', () => {
	const Dropdown = ({
		label,
		disabled,
		isInput,
		inputValue,
		onSelect,
		onChangeValue,
		children,
	}: DropdownProps) => (
		<button
			type="button"
			data-testid="dropdown"
			data-label={label}
			data-disabled={disabled ? 'true' : 'false'}
			data-is-input={isInput ? 'true' : 'false'}
			data-input-value={inputValue ?? ''}
			onClick={() => {
				onSelect?.('1');
				onChangeValue?.('search-next');
			}}
		>
			{children}
		</button>
	);

	const Option = ({ value, label }: OptionProps) => (
		<div data-testid={`option-${value}`}>{label}</div>
	);

	return { Dropdown, Option };
});

jest.mock('@/shared/ui/Chip', () => {
	const Chip = ({ label, prefix, onDelete, disabled, dataTestId }: ChipProps) => (
		<button
			type="button"
			data-testid={dataTestId ?? 'chip'}
			data-disabled={disabled ? 'true' : 'false'}
			onClick={onDelete}
		>
			{prefix}
			<span>{label}</span>
		</button>
	);

	return { Chip };
});

const defaultOptions = [
	{ label: 'One', value: '1' },
	{ label: 'Two', value: '2' },
];

const defaultItemsDictionary = {
	'1': { id: '1', title: 'Item 1', imageSrc: 'http://image-1' },
	'2': { id: '2', title: 'Item 2' },
};

const defaultSelectedItems = ['1', '2'];

const renderSelectWithChips = (props: Partial<SelectWithChipsProps> = {}) => {
	const defaultProps: SelectWithChipsProps = {
		title: 'Selected items',
		placeholder: 'Choose option',
		options: defaultOptions,
		selectedItems: defaultSelectedItems,
		itemsDictionary: defaultItemsDictionary,
		disabled: false,
		isInput: false,
		onChange: jest.fn(),
		handleDeleteItem: jest.fn(),
		dataTestId: selectWithChipsTestIds.selectWithChips,
	};

	const finalProps: SelectWithChipsProps = { ...defaultProps, ...props };

	return renderComponent(<SelectWithChips {...finalProps} />);
};

describe('SelectWithChips', () => {
	describe('Dropdown', () => {
		test('renders dropdown options', () => {
			renderSelectWithChips();

			expect(screen.getByTestId('option-1')).toHaveTextContent('One');
			expect(screen.getByTestId('option-2')).toHaveTextContent('Two');
		});

		test('passes placeholder and disabled props', () => {
			renderSelectWithChips({ placeholder: 'Choose', disabled: true });

			const dropdown = screen.getByTestId('dropdown');
			expect(dropdown).toHaveAttribute('data-label', 'Choose');
			expect(dropdown).toHaveAttribute('data-disabled', 'true');
		});

		test('passes isInput and inputValue props to Dropdown', () => {
			renderSelectWithChips({
				isInput: true,
				inputValue: 'search',
			});

			const dropdown = screen.getByTestId('dropdown');

			expect(dropdown).toHaveAttribute('data-is-input', 'true');
			expect(dropdown).toHaveAttribute('data-input-value', 'search');
		});

		test('calls onChangeValue when input value changes', () => {
			const onChangeValue = jest.fn();

			renderSelectWithChips({
				isInput: true,
				onChangeValue,
			});

			fireEvent.click(screen.getByTestId('dropdown'));

			expect(onChangeValue).toHaveBeenCalledWith('search-next');
		});
	});

	describe('Chips rendering', () => {
		test('renders wrapper with default test id and wrapper class', () => {
			renderSelectWithChips();

			const wrapper = screen.getByTestId(selectWithChipsTestIds.selectWithChips);
			expect(wrapper).toBeInTheDocument();
			expect(wrapper).toHaveClass(styles.wrapper);
		});

		test('renders title text and list with class when selected items exist', () => {
			renderSelectWithChips({ title: 'Custom title' });

			const title = screen.getByTestId(selectWithChipsTestIds.title);
			const list = screen.getByTestId(selectWithChipsTestIds.list);
			const chips = screen.getAllByTestId(selectWithChipsTestIds.chip);

			expect(title).toHaveTextContent('Custom title');
			expect(list).toHaveClass(styles.selection);
			expect(chips).toHaveLength(defaultSelectedItems.length);
			expect(chips[0]).toHaveTextContent('Item 1');
			expect(chips[1]).toHaveTextContent('Item 2');
		});

		test('renders title with expected variant class', () => {
			renderSelectWithChips({ title: 'Styled title' });

			expect(screen.getByTestId(selectWithChipsTestIds.title)).toHaveClass('body3-accent');
		});

		test('does not render title and list when selectedItems is empty', () => {
			renderSelectWithChips({ selectedItems: [] });

			expect(screen.queryByTestId(selectWithChipsTestIds.title)).not.toBeInTheDocument();
			expect(screen.queryByTestId(selectWithChipsTestIds.list)).not.toBeInTheDocument();
			expect(screen.queryByTestId(selectWithChipsTestIds.chip)).not.toBeInTheDocument();
		});

		test('uses custom root test id when dataTestId is provided', () => {
			renderSelectWithChips({ dataTestId: 'Custom_SelectWithChips' });

			expect(screen.getByTestId('Custom_SelectWithChips')).toBeInTheDocument();
		});
	});

	describe('Chip actions', () => {
		test('adds item by calling onChange when option is selected', () => {
			const onChange = jest.fn();
			renderSelectWithChips({ onChange });

			fireEvent.click(screen.getByTestId('dropdown'));

			expect(onChange).toHaveBeenCalledWith('1');
		});

		test('deletes item by calling handleDeleteItem and returned handler', () => {
			const deleteHandler = jest.fn();
			const handleDeleteItem = jest.fn(() => deleteHandler);

			renderSelectWithChips({
				selectedItems: ['1'],
				itemsDictionary: { '1': { id: '1', title: 'Item 1', imageSrc: null } },
				handleDeleteItem,
			});

			fireEvent.click(screen.getByTestId(selectWithChipsTestIds.chip));

			expect(handleDeleteItem).toHaveBeenCalledWith('1');
			expect(deleteHandler).toHaveBeenCalledTimes(1);
		});
	});

	describe('Props forwarding', () => {
		test('passes disabled prop to all chips', () => {
			renderSelectWithChips({ disabled: true });

			screen.getAllByTestId(selectWithChipsTestIds.chip).forEach((chip) => {
				expect(chip).toHaveAttribute('data-disabled', 'true');
			});
		});

		test('renders chip image prefix when imageSrc is provided', () => {
			renderSelectWithChips({
				selectedItems: ['1'],
				itemsDictionary: { '1': { id: '1', title: 'Item 1', imageSrc: 'http://image' } },
			});

			const chip = screen.getByTestId(selectWithChipsTestIds.chip);
			const img = chip.querySelector('img');

			expect(img).not.toBeNull();
			expect(img).toHaveAttribute('src', 'http://image');
			expect(img).toHaveAttribute('alt', 'Item 1');
		});

		test('does not render chip image prefix when imageSrc is absent', () => {
			renderSelectWithChips({
				selectedItems: ['1'],
				itemsDictionary: { '1': { id: '1', title: 'Item 1' } },
			});

			const chip = screen.getByTestId(selectWithChipsTestIds.chip);
			const img = chip.querySelector('img');

			expect(img).toBeNull();
		});
	});
});
