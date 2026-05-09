import classNames from 'classnames';
import { Key, ReactNode } from 'react';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Chip } from '../Chip';
import { Icon, IconName } from '../Icon';
import { Tooltip } from '../Tooltip';

import styles from './BaseFilterSection.module.css';

export type BaseFilterItem<T> = {
	id: T;
	title: string;
	imageSrc?: string | null;
	active?: boolean;
	disabled?: boolean;
	tooltip?: string;
	iconName?: IconName;
};

export type BaseFilterSectionRenderItemArgs<T> = {
	item: BaseFilterItem<T>;
	onClick?: () => void;
	disabled: boolean;
	active: boolean;
};

export interface BaseFilterSectionProps<T> {
	title: string;
	data: BaseFilterItem<T>[];
	onClick?: (id: T) => void;
	disabled?: boolean;
	renderItem?: (args: BaseFilterSectionRenderItemArgs<T>) => ReactNode;
	isAllActive?: boolean;
	imageSize?: 20 | 36;
	chipClassName?: string;
}

export const BaseFilterSection = <T,>({
	title,
	data,
	onClick,
	disabled,
	renderItem,
	isAllActive,
	imageSize = 20,
	chipClassName,
}: BaseFilterSectionProps<T>) => {
	const onHandleClick = (id: T) => () => {
		onClick?.(id);
	};

	return (
		<Flex direction="column" gap="8" className={styles.wrapper}>
			<Text variant="body2" color="black-700">
				{title}
			</Text>
			<Flex
				wrap="wrap"
				gap="8"
				style={{
					maxHeight: '500px',
					overflowY: 'auto',
				}}
			>
				{data &&
					data.map((item) => {
						const click = onClick ? onHandleClick(item.id) : undefined;
						const isDisabled = Boolean(disabled || item.disabled);
						const isActive = Boolean((!isDisabled && item.active) || isAllActive);

						return (
							<Tooltip title={item.tooltip} key={item?.id as Key} shouldShowTooltip={item.disabled}>
								<>
									{renderItem ? (
										renderItem({
											item,
											onClick: click,
											disabled: isDisabled,
											active: isActive,
										})
									) : (
										<Chip
											className={classNames(styles.chip, chipClassName)}
											label={item.title}
											theme="primary"
											prefix={
												item.iconName ? (
													<Icon icon={item.iconName} size={imageSize} color="black-700" />
												) : (
													item.imageSrc && (
														<img
															style={{ width: imageSize, height: imageSize }}
															src={item.imageSrc}
															alt={item.title}
															loading="lazy"
														/>
													)
												)
											}
											onClick={click}
											active={isActive}
											disabled={isDisabled}
										/>
									)}
								</>
							</Tooltip>
						);
					})}
			</Flex>
		</Flex>
	);
};
