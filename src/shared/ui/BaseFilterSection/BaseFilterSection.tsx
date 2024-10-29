import { Key } from 'react';
import { Chip, Icon } from 'yeahub-ui-kit';

import { getIconSkillImage } from '@/shared/utils/getIconSkillImage';

import styles from './BaseFilterSection.module.css';

export type DateType<T> = {
	id: T;
	title: string;
	imageSrc?: string;
	active?: boolean;
};

interface BaseFilterSectionProps<T> {
	title: string;
	data: DateType<T>[];
	onClick: (id: T) => void;
	showIcon?: boolean;
}

export const BaseFilterSection = <T,>({
	title,
	data,
	onClick,
	showIcon = true,
}: BaseFilterSectionProps<T>) => {
	const onHandleClick = (id: T) => () => {
		onClick(id);
	};

	return (
		<div>
			<h4 className={styles.title}>{title}</h4>
			<div className={styles['category-wrapper']}>
				{data &&
					data.map((skill) => {
						return (
							<Chip
								key={skill?.id as Key}
								label={skill.title}
								theme="primary"
								preffix={
									skill.imageSrc ? (
										<img style={{ width: 20, height: 20 }} src={skill.imageSrc} alt={skill.title} />
									) : (
										showIcon && <Icon icon={getIconSkillImage(skill)} />
									)
								}
								onClick={onHandleClick(skill.id)}
								active={skill.active}
							/>
						);
					})}
			</div>
		</div>
	);
};
