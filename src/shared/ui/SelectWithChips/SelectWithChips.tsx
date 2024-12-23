import { Select, Chip, Text } from 'yeahub-ui-kit';

import styles from './SelectWithChips.module.css';

type SelectWithChipsProps<T> = Omit<
	React.ComponentProps<typeof Select>,
	'options' | 'type' | 'value' | 'onChange'
> & {
	title: string;
	placeholder?: string;
	itemsDictionary?: Record<number, T>;
	options: { label: string; value: string }[];
	selectedItems?: number[];
	handleDeleteItem: (id: number) => () => void;
	onChange: (value?: string) => void;
};

export const SelectWithChips = <T extends { id: number; title: string }>({
	title,
	options,
	onChange,
	placeholder,
	selectedItems,
	handleDeleteItem,
	itemsDictionary,
}: SelectWithChipsProps<T>) => {
	return (
		<div className={styles.wrapper}>
			<Select
				onChange={onChange}
				options={options}
				type="default"
				placeholder={placeholder}
				className={styles.select}
			/>
			{!!selectedItems?.length && (
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
