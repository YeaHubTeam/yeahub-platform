import { Chip, Icon } from 'yeahub-ui-kit';
type DateType = {
	id: number;
	title: string;
	imageSrc?: string;
	active?: boolean;
};

interface BaseFilterSectionProps {
	title: string;
	data: DateType[];
	onClick?: (id: number) => void;
}

import styles from './BaseFilterSection.module.css';

//TODO active state, onClick - toggle state is active

export const BaseFilterSection = ({
	title,
	data,
	onClick = () => console.log('sss'),
}: BaseFilterSectionProps) => {
	const onHandleClick = (id: number) => () => {
		onClick(id);
	};

	return (
		<div className={styles.section}>
			<h4 className={styles.title}>{title}</h4>
			<div className={styles['category-wrapper']}>
				{data &&
					data.map((item) => {
						return (
							<Chip
								key={item?.id}
								className={styles.chip}
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
