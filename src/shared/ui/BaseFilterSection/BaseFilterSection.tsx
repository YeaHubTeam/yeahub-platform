import { Key } from 'react';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Chip } from '../Chip';
import { Tooltip } from '../Tooltip';

import styles from './BaseFilterSection.module.css';

type DateType<T> = {
	id: T;
	title: string;
	imageSrc?: string | null;
	active?: boolean;
	disabled?: boolean;
	tooltip?: string;
};

export interface BaseFilterSectionProps<T> {
	title: string;
	data: DateType<T>[];
	onClick: (id: T) => void;
	disabled?: boolean;
}

export const BaseFilterSection = <T,>({
	title,
	data,
	onClick,
	disabled,
}: BaseFilterSectionProps<T>) => {
	const onHandleClick = (id: T) => () => {
		onClick(id);
	};

	return (
		<Flex direction="column" gap="8" style={{ maxWidth: 'max-content' }}>
			<Text variant="body2" color="black-700">
				{title}
			</Text>
			<Flex wrap="wrap" gap="8">
				{data &&
					data.map((item) => (
						<Tooltip title={item.tooltip} key={item?.id as Key} shouldShowTooltip={item.disabled}>
							<Chip
								className={styles.chip}
								label={item.title}
								theme="primary"
								prefix={
									item.imageSrc && (
										<img
											style={{ width: 20, height: 20 }}
											src={item.imageSrc}
											alt={item.title}
											loading="lazy"
										/>
									)
								}
								onClick={onHandleClick(item.id)}
								active={!disabled && item.active}
								disabled={disabled || item.disabled}
							/>
						</Tooltip>
					))}
			</Flex>
		</Flex>
	);
};
