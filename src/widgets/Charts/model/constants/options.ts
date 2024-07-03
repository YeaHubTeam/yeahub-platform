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
					lineHeight: 24,
					fontWeight: 600,
					color: '#474747',
					formatter: '{value}%\nпройдено',
				},
			},
		],
	},
};
