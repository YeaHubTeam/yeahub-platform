import ReactECharts from 'echarts-for-react';

import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { AttemptInfoItemProps, AttemptInfoItem } from '@/shared/ui/AttemptInfoItem';

import { options } from '../../model/constants/options';

import styles from './PassedInterviewStat.module.css';

interface PassedInterviewStatProps {
	totalAttempt: number;
	attemptData: AttemptInfoItemProps[];
	isLoading?: boolean;
}

export const PassedInterviewStat = ({
	isLoading,
	totalAttempt,
	attemptData,
}: PassedInterviewStatProps) => {
	const pieOption = options.pie;
	pieOption.series[0].label.formatter = `{a}\n ${totalAttempt}`;
	pieOption.series[0].padAngle = attemptData.some((item) => item.value === 100) ? 0 : 15;
	pieOption.series[0].data = attemptData;

	const { isMobile } = useScreenSize();
	const fontSize = isMobile ? 'var(--font-size-p-s)' : 'var(--font-size-p-l)';

	return (
		<div className={styles.wrapper}>
			<ReactECharts
				showLoading={isLoading}
				option={pieOption}
				opts={{ locale: 'RU' }}
				style={{
					backgroundColor: '#FDF4FF',
					borderRadius: '50%',
					width: 'clamp(192px, calc(192px + 9.98vw - 57.6px), 307px)',
					height: 'clamp(192px, calc(192px + 9.98vw - 57.6px), 307px)',
					fontSize,
					fontWeight: 'var(--font-weight-600)',
					color: 'var(--text-color-light)',
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
