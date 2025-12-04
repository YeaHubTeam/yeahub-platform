import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { InterviewStatistics } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './GaugeChart.module.css';

interface GaugeChartProps {
	total?: number;
	learned?: number;
	percent?: number;
}

export const GaugeChart = ({ total, learned, percent }: GaugeChartProps) => {
	const { t } = useTranslation(i18Namespace.interviewStatistics);
	const passedQuestionsPercent =
		percent !== undefined ? percent : Math.round((learned! / total!) * 100);

	const { isMobile, isMobileS } = useScreenSize();

	let size = 241;

	if (isMobile) {
		size = 241;
	} else if (isMobileS) {
		size = 241;
	}

	const radius = size / 2;
	const strokeWidth = 24;
	const circleRadius = radius - strokeWidth / 2;
	const circumference = 2 * Math.PI * circleRadius;
	const progressOffset = circumference - (passedQuestionsPercent / 100) * circumference;

	return (
		<Flex className={styles['gauge-chart-container']} justify="center" align="center">
			<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
				<circle
					cx={radius}
					cy={radius}
					r={circleRadius}
					stroke="#FFE7AE"
					strokeWidth={strokeWidth}
					fill="#fffaec"
				/>
				<circle
					className={styles['gauge-progress']}
					cx={radius}
					cy={radius}
					r={circleRadius}
					stroke="#008616"
					strokeWidth={strokeWidth}
					fill="none"
					strokeLinecap="round"
					style={{
						strokeDasharray: circumference,
						strokeDashoffset: progressOffset,
						transition: 'stroke-dashoffset 0.3s ease-in-out',
					}}
				/>
			</svg>
			<Text color={'black-700'} variant="body4" className={styles['gauge-text']}>
				{!isNaN(passedQuestionsPercent) && <span>{passedQuestionsPercent}%</span>}
				{!isNaN(passedQuestionsPercent) && <br />}
				{total ? t(InterviewStatistics.PASSED) : t(InterviewStatistics.SOON)}
			</Text>
		</Flex>
	);
};
