import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewStatistics } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import style from './GaugeChart.module.css';

interface GaugeChartProps {
	total?: number;
	learned?: number;
	percent?: number;
}

export const GaugeChart = ({ total, learned, percent }: GaugeChartProps) => {
	const { t } = useTranslation(i18Namespace.interviewStatistics);
	const passedQuestionsPercent =
		percent !== undefined ? percent : Math.round((learned! / total!) * 100);

	const radius = 120;
	const strokeWidth = 24;
	const circleRadius = radius - strokeWidth / 2;
	const circumference = 2 * Math.PI * circleRadius;
	const progressOffset = circumference - (passedQuestionsPercent / 100) * circumference;

	return (
		<Flex className={style['gauge-chart-container']} justify="center" align="center">
			<svg width="241" height="241" viewBox={`0 0 241 241`}>
				<circle
					cx={radius}
					cy={radius}
					r={circleRadius}
					stroke="#F0E7FF"
					strokeWidth={strokeWidth}
					fill="none"
				/>
				<circle
					className={style['gauge-progress']}
					cx={radius}
					cy={radius}
					r={circleRadius}
					stroke="#400799"
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
			<Text variant="body4" className={style['gauge-text']}>
				{passedQuestionsPercent}%
				<br />
				{total ? t(InterviewStatistics.PASSED) : t(InterviewStatistics.SOON)}
			</Text>
		</Flex>
	);
};
