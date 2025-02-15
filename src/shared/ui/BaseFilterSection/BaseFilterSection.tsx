import { Key, ReactNode } from 'react';
import { Chip } from 'yeahub-ui-kit';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './BaseFilterSection.module.css';

type DateType<T> = {
	id: T;
	title: string;
	imageSrc?: string | null;
	active?: boolean;
};

export interface BaseFilterSectionProps<T> {
	title: string;
	data: DateType<T>[];
	onClick: (id: T) => void;
	getDefaultIcon?: (item: DateType<T>) => ReactNode;
}

export const BaseFilterSection = <T,>({
	title,
	data,
	onClick,
	getDefaultIcon,
}: BaseFilterSectionProps<T>) => {
	const onHandleClick = (id: T) => () => {
		onClick(id);
	};

	return (
		<Flex direction="column" gap="8">
			<Text variant="body2" color="black-700">
				{title}
			</Text>
			<Flex wrap="wrap" gap="8">
				{data &&
					data.map((item) => (
						// TODO Перенести компонент из uikit
						<Chip
							className={styles.chip}
							key={item?.id as Key}
							label={item.title}
							theme="primary"
							preffix={
								item.imageSrc ? (
									<img style={{ width: 20, height: 20 }} src={item.imageSrc} alt={item.title} />
								) : (
									getDefaultIcon && getDefaultIcon(item)
								)
							}
							onClick={onHandleClick(item.id)}
							active={item.active}
						/>
					))}
			</Flex>
		</Flex>
	);
};
