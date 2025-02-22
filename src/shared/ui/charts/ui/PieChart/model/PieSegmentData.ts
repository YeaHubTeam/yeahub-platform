import { AttemptInfoItemProps } from '@/shared/ui/AttemptInfoItem';

export interface PieSegmentData extends AttemptInfoItemProps {
	percentage: number;
	segmentAngle: number;
	totalValue: number;
}
