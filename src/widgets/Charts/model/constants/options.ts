export const options = {
	gauge: {
		series: [
			{
				type: 'gauge',
				startAngle: 0,
				endAngle: 360,
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
				name: 'Всего попыток',
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
					fontSize: 20,
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
			},
		],
	},
};
