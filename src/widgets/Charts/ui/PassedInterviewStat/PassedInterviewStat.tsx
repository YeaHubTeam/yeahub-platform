import ReactECharts from 'echarts-for-react';

import { AttemptData, AttemptInfoItem } from '@/shared/ui/AttemptInfoItem';

import { options } from '../../model/constants/options';

import styles from './PassedInterviewStat.module.css';

interface Props {
	totalAttempt: number;
	attemptData: AttemptData[];
	width?: string;
	height?: string;
}

export const PassedInterviewStat = ({ totalAttempt, attemptData }: Props) => {
	const pieOption = options.pie;
	pieOption.series[0].label.formatter = `{a}\n ${totalAttempt}`;
	pieOption.series[0].data = attemptData;

	return (
		<div className={styles.wrapper}>
			<ReactECharts
				className={styles.charts}
				option={pieOption}
				opts={{ locale: 'RU' }}
				style={{
					backgroundColor: '#FDF4FF',
					borderRadius: '50%',
				}}
			/>

			<ul className={styles.list}>
				{attemptData.map((item) => (
					<AttemptInfoItem key={item.name} {...item} />
				))}
			</ul>
		</div>
	);
};
