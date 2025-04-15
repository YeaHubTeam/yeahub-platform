export interface PieSegment {
	percentage: number;
	segmentAngle: number;
	totalValue: number;
	value: number;
	name: string;
	itemStyle?: {
		color?: string;
	};
}
