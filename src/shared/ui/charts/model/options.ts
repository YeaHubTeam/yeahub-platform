import i18n, { i18Namespace } from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

const screenWidth = window.innerWidth;
const isMobile = screenWidth < 768;

export const options = {
	gauge: {
		series: [
			{
				type: 'gauge',
				startAngle: 0,
				endAngle: 360,
				radius: '100%',
				pointer: {
					width: 0,
				},
				progress: {
					show: true,
					overlap: false,
					roundCap: true,
					clip: false,
				},
				axisLine: {
					lineStyle: {
						width: 24,
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
				data: {},
				silent: true,
				detail: {
					fontSize: 18,
					fontFamily: 'Manrope',
					lineHeight: 24,
					fontWeight: 600,
					color: '#474747',
					formatter: '{value}%\nпройдено',
				},
			},
		],
	},
	pie: {
		series: [
			{
				name: i18n.t(Translation.TOTAL_QUESTIONS, { ns: i18Namespace.translation }),
				type: 'pie',
				startAngle: 0,
				endAngle: 360,
				emphasis: {
					scale: false,
				},
				label: {
					show: true,
					position: 'center',
					formatter: '',
					color: '#474747',
					fontSize: isMobile ? 14 : 18,
					fontFamily: 'Manrope',
					fontWeight: 600,
					lineHeight: 27,
				},
				radius: ['95%', '100%'],
				avoidLabelOverlap: false,
				legendHoverLink: false,
				padAngle: 15,
				itemStyle: {
					borderRadius: 10,
				},
				data: {},
				silent: true,
			},
		],
	},
	bar: {
		dataset: {
			source: {},
		},
		grid: {
			width: '100%',
			height: '12px',
			top: 0,
			left: 0,
		},
		xAxis: {
			max: 100,
			axisLabel: {
				show: false,
			},
			splitLine: {
				show: false,
			},
		},
		yAxis: {
			type: 'category',
			axisLabel: {
				show: false,
			},
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: false,
			},
		},
		series: [
			{
				encode: {
					// Map the "amount" column to X axis.
					x: 'value',
					// Map the "product" column to Y axis
					y: 'product',
				},
				type: 'bar',
				barWidth: 12,
				itemStyle: {
					borderRadius: 21,
					color: '#400799',
				},
				showBackground: true,
				backgroundStyle: {
					borderRadius: 21,
					color: '#F0E7FF',
				},
			},
		],
	},
};
