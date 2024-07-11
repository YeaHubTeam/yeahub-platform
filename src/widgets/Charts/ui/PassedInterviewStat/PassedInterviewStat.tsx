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

export const PassedInterviewStat = ({
	totalAttempt,
	attemptData,
	width = '307px',
	height = '307px',
}: Props) => {
	const pieOption = options.pie;
	pieOption.series[0].label.formatter = `{a}\n ${totalAttempt}`;
	pieOption.series[0].data = attemptData;

	return (
		<div className={styles.wrapper}>
			<ReactECharts
				option={pieOption}
				opts={{ locale: 'RU' }}
				style={{
					width,
					height,
					backgroundColor: '#FDF4FF',
					borderRadius: '50%',
					flexShrink: 0,
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
