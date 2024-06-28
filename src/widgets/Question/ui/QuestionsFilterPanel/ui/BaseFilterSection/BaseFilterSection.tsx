import { Chip, Icon } from 'yeahub-ui-kit';
type DateType = {
	id: string | number;
	title: string;
	imageSrc?: string;
};

interface BaseFilterSectionProps {
	title: string;
	data: DateType[];
	onClick?: (id: string) => void;
}

import styles from './BaseFilterSection.module.css';

//TODO active state, onClick - toggle state is active

export const BaseFilterSection = ({ title, data }: BaseFilterSectionProps) => {
	return (
		<div className={styles.section}>
			<h4 className={styles.title}>{title}</h4>
			<div className={styles['category-wrapper']}>
				{data &&
					data?.map((item) => {
						return (
							<Chip
								key={item?.id}
								className={styles.chip}
								label={item.title}
								theme="primary"
								preffix={item.imageSrc ? <Icon icon="fileHtml" /> : null}
								//onClick={onClick ? onClick(item.id) : undefined}
							/>
						);
					})}
			</div>
		</div>
	);
};
