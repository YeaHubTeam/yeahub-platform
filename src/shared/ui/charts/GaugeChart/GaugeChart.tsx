import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, InterviewStatistics } from '@/shared/config';
import { Pallete } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { TextVariant } from '../../Text/types';

import styles from './GaugeChart.module.css';

interface GaugeChartProps {
	total?: number;
	learned?: number;
	percent?: number;
	text?: boolean;
	sizeCircle?: number;
	widthCircle?: number;
	color?: string;
	backColor?: string;
	fillColor?: string;
	textColor?: Pallete;
	textVariant?: TextVariant;
	textClassName?: string;
}

export const GaugeChart = ({
	total,
	learned,
	percent,
	text = true,
	sizeCircle = 241,
	widthCircle = 24,
	color = '#008616',
	backColor = '#FFE7AE',
	fillColor = '#fffaec',
	textColor = 'black-700',
	textVariant = 'body4',
	textClassName,
}: GaugeChartProps) => {
	const { t } = useTranslation(i18Namespace.interviewStatistics);

	const passedQuestionsPercent =
		percent !== undefined ? percent : Math.round((learned! / total!) * 100);

	const radius = sizeCircle / 2;
	const circleRadius = radius - widthCircle / 2;
	const circumference = 2 * Math.PI * circleRadius;
	const progressOffset = circumference - (passedQuestionsPercent / 100) * circumference;

	return (
		<Flex className={styles['gauge-chart-container']} justify="center" align="center">
			<svg width={sizeCircle} height={sizeCircle} viewBox={`0 0 ${sizeCircle} ${sizeCircle}`}>
				<circle
					cx={radius}
					cy={radius}
					r={circleRadius}
					stroke={backColor}
					strokeWidth={widthCircle}
					fill={fillColor}
				/>
				<circle
					className={styles['gauge-progress']}
					cx={radius}
					cy={radius}
					r={circleRadius}
					stroke={color}
					strokeWidth={widthCircle}
					fill="none"
					strokeLinecap="round"
					style={{
						strokeDasharray: circumference,
						strokeDashoffset: progressOffset,
						transition: 'stroke-dashoffset 0.3s ease-in-out',
					}}
				/>
			</svg>
			<Text
				color={textColor}
				variant={textVariant}
				className={textClassName || styles['gauge-text']}
			>
				{!isNaN(passedQuestionsPercent) && <span>{passedQuestionsPercent}%</span>}
				{!isNaN(passedQuestionsPercent) && <br />}
				{text && (total ? t(InterviewStatistics.PASSED) : t(InterviewStatistics.SOON))}
			</Text>
		</Flex>
	);
};
