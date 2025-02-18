import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewStatistics } from '@/shared/config/i18n/i18nTranslations';

import style from './GaugeChart.module.css';

interface GaugeChartProps {
	total: number;
	learned: number;
	width?: string;
	height?: string;
	isLoading?: boolean;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
	total,
	learned,
	width = '241px',
	height = '241px',
	isLoading,
}) => {
	const passedQuestionsPercent = Math.round((learned / total) * 100);

	const { t } = useTranslation(i18Namespace.interviewStatistics);

	const radius = parseInt(width) / 2;

	const strokeWidth = 24;

	const circleRadius = radius - strokeWidth / 2;

	const circumference = 2 * Math.PI * circleRadius;

	const progressOffset = circumference - (passedQuestionsPercent / 100) * circumference;

	return (
		<div
			className={style['gauge-chart-container']}
			style={{
				width,
				height,
				backgroundColor: '#FDF4FF',
				borderRadius: '50%',
				position: 'relative',
			}}
		>
			{isLoading ? (
				<div className={style['loading']}>Loading...</div>
			) : (
				<>
					<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
						<circle
							cx={radius}
							cy={radius}
							r={circleRadius}
							stroke="#E0E0E0"
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
					<div
						className={style['gauge-text']}
						style={{
							fontSize: 'var(--font-size-p-l)',
							fontWeight: 'var(--font-weight-600)',
							color: 'var(--text-color-light)',
						}}
					>
						{passedQuestionsPercent}%
						<br />
						{total ? t(InterviewStatistics.PASSED) : t(InterviewStatistics.SOON)}{' '}
					</div>
				</>
			)}
		</div>
	);
};
