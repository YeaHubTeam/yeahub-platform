import { ComponentProps, useMemo } from 'react';

import { Dropdown, type DropdownSize, Option } from '@/shared/ui/Dropdown';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

export type EntitySelectItem<T extends number | string> = {
	id: T;
	title: string;
	imageSrc?: string | null;
};

export type EntitySelectProps<T extends number | string> = Omit<
	ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	items: EntitySelectItem<T>[];
	excludeIds?: T[];
	value: T | T[];
	onChange: (value: T | T[]) => void;
	hasMultiple?: boolean;
	disabled?: boolean;
	chooseTranslationKey: string;
	emptyTranslationKey: string;
	selectedTranslationKey: string;
	width?: number;
	size?: DropdownSize;
	isInput?: boolean;
	inputValue?: string;
	onChangeValue?: (value: string) => void;
};

export const EntitySelect = <T extends number | string>({
	items,
	excludeIds,
	value,
	onChange,
	hasMultiple,
	disabled,
	chooseTranslationKey,
	emptyTranslationKey,
	selectedTranslationKey,
	width,
	prefix,
	className,
	size,
	isInput,
	inputValue,
	onChangeValue,
}: EntitySelectProps<T>) => {
	const normalizedValue = useMemo<T[]>(
		() => (Array.isArray(value) ? value : value !== undefined ? [value] : []),
		[value],
	);

	const handleChange = (newValue: string | number | undefined) => {
		if (disabled || !newValue) return;
		const parsedValue = newValue as T;

		if (hasMultiple) {
			if (normalizedValue.includes(parsedValue)) return;
			onChange([...normalizedValue, parsedValue]);
		} else {
			onChange(parsedValue);
		}
	};

	const handleDelete = (id: T) => () => {
		if (disabled) return;

		onChange(normalizedValue.filter((itemId) => itemId !== id));
	};

	const options = useMemo(() => {
		const filteredByExclude = excludeIds?.length
			? items.filter((item) => !excludeIds.includes(item.id))
			: items;

		const mapped = filteredByExclude.map((item) => ({ label: item.title, value: item.id }));

		if (!hasMultiple) return mapped;
		return mapped.filter((option) => !normalizedValue.includes(option.value));
	}, [items, normalizedValue, hasMultiple, excludeIds]);

	const itemsDictionary = useMemo(() => {
		return items.reduce(
			(acc, item) => {
				acc[item.id] = item;
				return acc;
			},
			{} as Record<T, EntitySelectItem<T>>,
		);
	}, [items]);

	if (hasMultiple) {
		return (
			<SelectWithChips
				title={selectedTranslationKey}
				options={options}
				onChange={handleChange}
				selectedItems={normalizedValue}
				handleDeleteItem={handleDelete}
				itemsDictionary={itemsDictionary}
				placeholder={options.length ? chooseTranslationKey : emptyTranslationKey}
				disabled={disabled}
				isInput={isInput}
				inputValue={inputValue}
				onChangeValue={onChangeValue}
			/>
		);
	}

	return (
		<Dropdown
			size={size}
			label={options.length ? chooseTranslationKey : emptyTranslationKey}
			disabled={disabled}
			value={itemsDictionary[normalizedValue[0]]?.title ?? ''}
			onSelect={handleChange}
			prefix={prefix}
			className={className}
			width={width}
			isInput={isInput}
			inputValue={inputValue}
			onChangeValue={onChangeValue}
		>
			{options.map((option) => (
				<Option value={option.value} label={option.label} key={option.label} />
			))}
		</Dropdown>
	);
};
