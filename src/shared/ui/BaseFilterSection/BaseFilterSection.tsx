import { Key, ReactNode } from 'react';
import { Chip } from 'yeahub-ui-kit';

import styles from './BaseFilterSection.module.css';

type DateType<T> = {
	id: T;
	title: string;
	imageSrc?: string | null;
	active?: boolean;
};

interface BaseFilterSectionProps<T> {
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
		<div>
			<h4 className={styles.title}>{title}</h4>
			<div className={styles['category-wrapper']}>
				{data &&
					data.map((item) => (
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
			</div>
		</div>
	);
};
