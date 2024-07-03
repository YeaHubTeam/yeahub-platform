import { StatInfoItem } from '../../StatInfoItem';

import styles from './PassedQuestionStatInfo.module.css';

interface Props {
	stats: {
		title: string;
		value: string;
	}[];
}

export const PassedQuestionStatInfo = ({ stats }: Props) => {
	return (
		<div className={styles.info}>
			{stats.map((stat, index) => (
				<StatInfoItem key={index} {...stat} />
			))}
		</div>
	);
};
