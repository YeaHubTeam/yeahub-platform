import { Select, Text } from 'yeahub-ui-kit';

import { Chip } from '@/shared/ui/Chip';

import styles from './SelectWithChips.module.css';

type SelectWithChipsProps<T, U> = Omit<
	React.ComponentProps<typeof Select>,
	'options' | 'type' | 'value' | 'onChange'
> & {
	title?: string;
	placeholder?: string;
	prefix?: string;
	itemsDictionary?: Record<number | string, T>;
	options: { label: string; value: string }[];
	selectedItems?: U[];
	disabled?: boolean;
	handleDeleteItem: (id: U) => () => void;
	onChange: (value?: string) => void;
};

export const SelectWithChips = <
	T extends { id: number | string; title: string; imageSrc?: string | null },
	U extends number | string,
>({
	title,
	options,
	onChange,
	placeholder,
	selectedItems,
	handleDeleteItem,
	itemsDictionary,
	disabled,
}: SelectWithChipsProps<T, U>) => {
	return (
		<div className={styles.wrapper}>
			<Select
				onChange={onChange}
				options={options}
				type="default"
				placeholder={placeholder}
				className={styles.select}
				disabled={disabled}
			/>
			{!!selectedItems?.length && (
				<>
					<Text title={title} />
					<div className={styles.selection}>
						{selectedItems.map((id) => (
							<Chip
								key={id}
								prefix={
									itemsDictionary?.[id as U]?.imageSrc ? (
										<img
											src={itemsDictionary[id as U].imageSrc ?? ''}
											alt={itemsDictionary[id as U].title}
										/>
									) : undefined
								}
								label={itemsDictionary?.[id as U]?.title}
								theme="primary"
								onDelete={handleDeleteItem(id as U)}
								disabled={disabled}
								active
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};
