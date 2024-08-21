import { Icon } from 'yeahub-ui-kit';

import styles from './BenefitItem.module.css';

interface BenefitItemProps {
	text: string;
}

export const BenefitItem = ({ text }: BenefitItemProps) => {
	return (
		<li className={styles['text-wrapper']}>
			<span className={styles['icon-wrapper']}>
				<Icon key="checkCircle" icon="checkCircle" size={20} color="--palette-ui-purple-200" />
			</span>
			{text}
		</li>
	);
};
