import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewStatistics } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './GaugeChart.module.css';

interface GaugeChartProps {
	total?: number;
	learned?: number;
	percent?: number;
}
/**
 * GaugeChart component displays progress as a circle.
 * The fill color dynamically changes according to the progress value.
 *
 * @param total - Total number of questions.
 * @param learned - Number of questions studied.
 * @param percent - Progress percentage (0-100). If not provided, it is calculated as (learned / total) * 100.
 * @returns JSX.Element
 */

export const GaugeChart = ({ total, learned, percent }: GaugeChartProps) => {
	const { t } = useTranslation(i18Namespace.interviewStatistics);
	const passedQuestionsPercent =
		percent !== undefined ? percent : Math.round((learned! / total!) * 100);

	const { isMobile, isMobileS } = useScreenSize();

	let size = 240;

	if (isMobile) {
		size = 198;
	} else if (isMobileS) {
		size = 190;
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
				{passedQuestionsPercent}%
				<br />
				{total ? t(InterviewStatistics.PASSED) : t(InterviewStatistics.SOON)}
			</Text>
		</Flex>
	);
};
