import { fireEvent, screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';
import type { ChipProps } from '@/shared/ui/Chip';
import type { DropdownProps } from '@/shared/ui/Dropdown';
import type { OptionProps } from '@/shared/ui/Dropdown';
import type { TextProps } from '@/shared/ui/Text';

import { selectWithChipsTestIds } from './constants';
import { SelectWithChips } from './SelectWithChips';
import type { SelectWithChipsProps as SelectWithChipsGenericProps } from './SelectWithChips';

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
		children,
	}: DropdownProps) => (
		<button
			type="button"
			data-testid="dropdown"
			data-label={label}
			data-disabled={disabled ? 'true' : 'false'}
			data-is-input={isInput ? 'true' : 'false'}
			data-input-value={inputValue ?? ''}
			onClick={() => onSelect?.('1')}
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
	const Chip = ({ label, prefix, onDelete, disabled }: ChipProps) => (
		<button
			type="button"
			data-testid="chip"
			data-disabled={disabled ? 'true' : 'false'}
			onClick={onDelete}
		>
			{prefix}
			<span>{label}</span>
		</button>
	);

	return { Chip };
});

jest.mock('@/shared/ui/Text', () => {
	const Text = ({ children }: TextProps) => <div>{children}</div>;

	return { Text };
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

	return renderComponent(
		<SelectWithChips {...defaultProps} {...(props as SelectWithChipsProps)} />,
	);
};

describe('SelectWithChips', () => {
	describe('Rendering', () => {
		test('renders component with default test id', () => {
			renderSelectWithChips();

			const wrapper = screen.getByTestId(selectWithChipsTestIds.selectWithChips);
			expect(wrapper).toBeInTheDocument();
		});

		test('passes placeholder and disabled props to Dropdown', () => {
			renderSelectWithChips({ placeholder: 'Choose', disabled: true });

			const dropdown = screen.getByTestId('dropdown');
			expect(dropdown).toHaveAttribute('data-label', 'Choose');
			expect(dropdown).toHaveAttribute('data-disabled', 'true');
		});
	});

	describe('Dropdown behavior', () => {
		test('calls onChange with selected option value as string', () => {
			const onChange = jest.fn();

			renderSelectWithChips({ onChange });

			const dropdown = screen.getByTestId('dropdown');

			fireEvent.click(dropdown);
			expect(onChange).toHaveBeenCalledWith('1');
		});
	});

	describe('Chips rendering', () => {
		test('renders title and chips when selectedItems is not empty', () => {
			renderSelectWithChips();

			expect(screen.getByText('Selected items')).toBeInTheDocument();

			const chips = screen.getAllByTestId('chip');
			expect(chips).toHaveLength(defaultSelectedItems.length);
			expect(chips[0]).toHaveTextContent('Item 1');
			expect(chips[1]).toHaveTextContent('Item 2');
		});

		test('does not render chips and title when selectedItems is empty', () => {
			renderSelectWithChips({ selectedItems: [] });

			expect(screen.queryByTestId('chip')).not.toBeInTheDocument();
			expect(screen.queryByText('Selected items')).not.toBeInTheDocument();
		});
	});

	describe('Chip deletion', () => {
		test('calls handleDeleteItem and inner delete handler', () => {
			const deleteHandler = jest.fn();
			const handleDeleteItem = jest.fn(() => deleteHandler);

			renderSelectWithChips({
				selectedItems: ['1'],
				itemsDictionary: {
					'1': { id: '1', title: 'Item 1', imageSrc: null },
				},
				handleDeleteItem,
			});

			const chip = screen.getByTestId('chip');

			fireEvent.click(chip);

			expect(handleDeleteItem).toHaveBeenCalledWith('1');
			expect(deleteHandler).toHaveBeenCalledTimes(1);
		});
	});

	describe('Chip prefix image', () => {
		test('renders img prefix when imageSrc is provided', () => {
			renderSelectWithChips({
				selectedItems: ['1'],
				itemsDictionary: {
					'1': { id: '1', title: 'Item 1', imageSrc: 'http://image' },
				},
			});

			const chip = screen.getByTestId('chip');
			const img = chip.querySelector('img');

			expect(img).not.toBeNull();
			expect(img).toHaveAttribute('src', 'http://image');
			expect(img).toHaveAttribute('alt', 'Item 1');
		});

		test('does not render img prefix when imageSrc is not provided', () => {
			renderSelectWithChips({
				selectedItems: ['1'],
				itemsDictionary: {
					'1': { id: '1', title: 'Item 1' },
				},
			});

			const chip = screen.getByTestId('chip');
			const img = chip.querySelector('img');

			expect(img).toBeNull();
		});
	});

	describe('Disabled and input mode', () => {
		test('passes disabled prop to Chip', () => {
			renderSelectWithChips({ disabled: true });

			const chips = screen.getAllByTestId('chip');

			chips.forEach((chip) => {
				expect(chip).toHaveAttribute('data-disabled', 'true');
			});
		});

		test('passes isInput and inputValue props to Dropdown', () => {
			const onChangeValue = jest.fn();

			renderSelectWithChips({
				isInput: true,
				inputValue: 'search',
				onChangeValue,
			});

			const dropdown = screen.getByTestId('dropdown');

			expect(dropdown).toHaveAttribute('data-is-input', 'true');
			expect(dropdown).toHaveAttribute('data-input-value', 'search');
		});
	});
});
