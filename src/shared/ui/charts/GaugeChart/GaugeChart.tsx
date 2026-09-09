import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { InterviewStatistics } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './GaugeChart.module.css';

type SizeText = 'small' | 'medium' | 'large';

interface GaugeChartProps {
	total?: number;
	learned?: number;
	percent?: number;
	size?: number;
	strokeWidth?: number;
	progressColor?: string;
	backgroundColor?: string;
	backgroundStrokeColor?: string;
	sizeText?: SizeText;
}

export const GaugeChart = ({
	total,
	learned,
	percent,
	size: sizeProp,
	strokeWidth: strokeWidthProp,
	progressColor = '#008616',
	backgroundColor = '#fffaec',
	backgroundStrokeColor = '#FFE7AE',
	sizeText,
}: GaugeChartProps) => {
	const { t } = useTranslation(i18Namespace.interviewStatistics);
	const passedQuestionsPercent =
		percent !== undefined ? percent : Math.round((learned! / total!) * 100);

	const { isMobile, isMobileS } = useScreenSize();

	let size = sizeProp ?? 241;

	if (!sizeProp) {
		if (isMobile) {
			size = 241;
		} else if (isMobileS) {
			size = 241;
		}
	}

	const strokeWidth = strokeWidthProp ?? 24;
	const radius = size / 2;
	const circleRadius = radius - strokeWidth / 2;
	const circumference = 2 * Math.PI * circleRadius;
	const progressOffset = circumference - (passedQuestionsPercent / 100) * circumference;

	const textVariant = sizeText === 'medium' ? 'body2' : 'body4';

	return (
		<Flex className={styles['gauge-chart-container']} justify="center" align="center">
			<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
				<circle
					cx={radius}
					cy={radius}
					r={circleRadius}
					stroke={backgroundStrokeColor}
					strokeWidth={strokeWidth}
					fill={backgroundColor}
				/>
				<circle
					className={styles['gauge-progress']}
					cx={radius}
					cy={radius}
					r={circleRadius}
					stroke={progressColor}
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
			{!sizeText && (
				<Text color="black-700" variant="body4" className={styles['gauge-text']}>
					{!isNaN(passedQuestionsPercent) && <span>{passedQuestionsPercent}%</span>}
					{!isNaN(passedQuestionsPercent) && <br />}
					{total ? t(InterviewStatistics.PASSED) : t(InterviewStatistics.SOON)}
				</Text>
			)}
			{sizeText && !isNaN(passedQuestionsPercent) && (
				<Text color="black-700" variant={textVariant} className={styles['gauge-text']}>
					{passedQuestionsPercent}%
				</Text>
			)}
		</Flex>
	);
};
