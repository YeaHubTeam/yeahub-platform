import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { StatInfoItem } from '../../StatInfoItem';

import styles from './PassedQuestionStatInfo.module.css';

interface PassedQuestionStatInfoProps {
	stats: {
		title: string;
		value: string;
		route?: string;
	}[];
	hasShadow?: boolean;
}

export const PassedQuestionStatInfo = ({ stats, hasShadow }: PassedQuestionStatInfoProps) => {
	return (
		<div className={classNames(styles.info, { [styles['margin-top']]: !!hasShadow })}>
			{stats.map((stat, index) =>
				stat.route ? (
					<Link to={stat.route} key={index}>
						<StatInfoItem {...stat} hasShadow={hasShadow} />
					</Link>
				) : (
					<StatInfoItem {...stat} key={index} className={styles.stat} hasShadow={hasShadow} />
				),
			)}
		</div>
	);
};
