import { Key } from 'react';
import { Chip, Icon } from 'yeahub-ui-kit';

import styles from './BaseFilterSection.module.css';

type DateType<T> = {
	id: T;
	title: string;
	imageSrc?: string;
	active?: boolean;
};

interface BaseFilterSectionProps<T> {
	title: string;
	data: DateType<T>[];
	onClick: (id: T) => void;
}

export const BaseFilterSection = <T,>({ title, data, onClick }: BaseFilterSectionProps<T>) => {
	const onHandleClick = (id: T) => () => {
		onClick(id);
	};

	return (
		<div>
			<h4 className={styles.title}>{title}</h4>
			<div className={styles['category-wrapper']}>
				{data &&
					data.map((item) => {
						return (
							<Chip
								key={item?.id as Key}
								label={item.title}
								theme="primary"
								preffix={item.imageSrc ? <Icon icon="fileHtml" /> : null}
								onClick={onHandleClick(item.id)}
								active={item.active}
							/>
						);
					})}
			</div>
		</div>
	);
};
