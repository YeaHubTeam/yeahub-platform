import { BenefitItem } from '../BenefitItem/BenefitItem';

import { benefitsItems } from './benefitsItems';
import styles from './BenefitsList.module.css';

export const BenefitsList = () => {
	return (
		<div>
			<h4 className={styles.title}>
				Стань частью сообщества <br /> YeaHub и получи:
			</h4>
			<ul className={styles['benefit-wrapper']}>
				{benefitsItems.map((benefit) => (
					<BenefitItem key={benefit} text={benefit} />
				))}
			</ul>
		</div>
	);
};
