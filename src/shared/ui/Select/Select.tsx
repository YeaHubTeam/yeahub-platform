import classNames from 'classnames';
import { useState, useMemo } from 'react';
import { Select as UiKitSelect, Chip, Text } from 'yeahub-ui-kit';

import styles from './Select.module.css';

type SelectProps<T> = Omit<
	React.ComponentProps<typeof UiKitSelect>,
	'options' | 'type' | 'value' | 'onChange'
> & {
	variant: 'single' | 'multiple-with-chips';
	className?: string;
	title?: string;
	placeholder?: string;
	value?: number[];
	data?: T[];
	staticOptions?: { label: string; value: string }[];
	onChange: (value: number[] | number) => void;
};

export const Select = <T extends { id: number; title: string }>({
	title,
	placeholder,
	className,
	onChange,
	variant,
	data,
	staticOptions,
	value,
}: SelectProps<T>) => {
	const [selectedItems, setSelectedItems] = useState<number[]>([]);

	const hasMultiple = variant === 'multiple-with-chips';

	const handleChange = (newValue: string | undefined) => {
		if (!newValue) return;

		if (hasMultiple) {
			const updates = [...(selectedItems || []), +newValue];
			setSelectedItems(updates);
			onChange(updates);
		} else {
			onChange(+newValue);
		}
	};

	const handleDeleteItem = (id: number) => () => {
		const updates = selectedItems.filter((itemId) => itemId !== id);
		setSelectedItems(updates);
		onChange(updates);
	};

	const options = useMemo(() => {
		if (hasMultiple) {
			return (data || [])
				.map((item) => ({
					label: item.title,
					value: item.id.toString(),
					limit: 100,
				}))
				.filter((item) => !selectedItems?.includes(+item.value));
		} else {
			return (data || []).map((item) => ({
				label: item.title,
				value: item.id.toString(),
				limit: 100,
			}));
		}
	}, [data, selectedItems]);

	const itemsDictionary = useMemo(() => {
		return data?.reduce(
			(acc, item) => {
				acc[item.id] = item;
				return acc;
			},
			{} as Record<number, T>,
		);
	}, [data]);

	if (!hasMultiple) {
		return (
			<UiKitSelect
				value={value || value === 0 ? value.toString() : undefined}
				type="default"
				onChange={handleChange}
				options={staticOptions ?? options}
				placeholder={placeholder}
				className={styles.select}
			/>
		);
	}

	return (
		<div className={classNames(styles.wrapper, className)}>
			<UiKitSelect
				type="default"
				onChange={handleChange}
				options={staticOptions ?? options}
				placeholder={placeholder}
				className={styles.select}
			/>
			{!!selectedItems?.length && hasMultiple && (
				<>
					<Text title={title} />
					<div className={styles.selection}>
						{selectedItems.map((id) => (
							<Chip
								key={id}
								label={itemsDictionary?.[id]?.title}
								theme="primary"
								onDelete={handleDeleteItem(id)}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};
