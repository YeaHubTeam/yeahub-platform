import ReactECharts from 'echarts-for-react';
import { FC } from 'react';

import styles from './PassedQuestionStat.module.css';

interface Props {
	total: number;
	learned: number;
	unexplored: number;
	saved?: number;
}

export const PassedQuestionStat: FC<Props> = ({ total, learned, unexplored, saved }) => {
	const passedQuestionsPercent = Math.round((learned / total) * 100);

	const gaugeData = [
		{
			value: passedQuestionsPercent,
			detail: {
				valueAnimation: true,
				offsetCenter: ['0%', '0%'],
			},
			itemStyle: { color: '#400799' },
		},
	];

	const option = {
		series: [
			{
				type: 'gauge',
				startAngle: 90,
				endAngle: -270,
				radius: '100%',
				pointer: {
					show: false,
				},
				progress: {
					show: true,
					overlap: false,
					roundCap: true,
					clip: false,
				},
				axisLine: {
					lineStyle: {
						width: 20,
					},
				},
				splitLine: {
					show: false,
					distance: 0,
					length: 10,
				},
				axisTick: {
					show: false,
				},
				axisLabel: {
					show: false,
					distance: 50,
				},
				data: gaugeData,
				detail: {
					fontSize: 18,
					lineHeight: 24,
					fontWeight: 600,
					color: '#474747',
					formatter: '{value}%\nпройдено',
				},
			},
		],
	};

	// const option = {
	// 	showEmptyCircle: true,
	// 	title: {
	// 		text: `${passedQuestionsPercent}%\n пройдено`,
	// 		left: 'center',
	// 		top: 'center',
	// 	},
	// 	series: [
	// 		{
	// 			name: 'Статистика собеседований',
	// 			type: 'pie',
	// 			radius: ['80%', '100%'],
	// 			avoidLabelOverlap: false,
	// 			label: {
	// 				show: false,
	// 			},
	// 			labelLine: {
	// 				show: false,
	// 			},
	// 			data: [
	// 				{
	// 					value: learned,
	// 					name: 'Изучено',
	// 					itemStyle: { color: '#400799', borderRadius: 16 },
	// 				},
	// 				{
	// 					value: unexplored,
	// 					name: 'Не изучено',
	// 					itemStyle: {
	// 						color: '#F0E7FF',
	// 					},
	// 				},
	// 			],
	// 		},
	// 	],
	// };

	return (
		<div className={styles.container}>
			<ReactECharts
				option={option}
				opts={{ locale: 'RU' }}
				style={{ width: '241px', height: '241px' }}
			/>
			<div className={styles.info}>
				<div className={styles.stat}>
					<h4>Всего вопросов</h4>
					<span>{total}</span>
				</div>
				<div className={styles.stat}>
					<h4>Не изучено</h4>
					<span>{unexplored}</span>
				</div>
				{saved !== undefined && (
					<div className={styles.stat}>
						<h4>Сохранено</h4>
						<span>{saved}</span>
					</div>
				)}
				<div className={styles.stat}>
					<h4>Изучено</h4>
					<span>{learned}</span>
				</div>
			</div>
		</div>
	);
};
