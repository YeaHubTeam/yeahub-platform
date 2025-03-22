import { CardSkeleton } from '@/shared/ui/Card';
import { GaugeChartSkeleton } from '@/shared/ui/charts/GaugeChart';
import { Flex } from '@/shared/ui/Flex';

import { AdditionalStatInfoListSkeleton } from '../AdditionalStatInfoList/AdditionalStatInfoList.skeleton';

import { AdditionalStatInfoGaugeProps } from './AdditionalStatInfoGauge';
import styles from './AdditionalStatInfoGauge.module.css';

export const AdditionalStatInfoGaugeSkeleton = ({
	className,
	isActionPositionBottom,
	actionTitle,
	actionRoute,
}: Partial<AdditionalStatInfoGaugeProps>) => {
	return (
		<CardSkeleton
			className={className}
			isTitleCenter
			title="title"
			isActionPositionBottom={isActionPositionBottom}
			actionTitle={actionTitle ? 'actionTitle' : ''}
			actionRoute={actionRoute ? 'actionRoute' : ''}
		>
			<Flex direction="column" align="center" justify="center" gap="24" className={styles.wrapper}>
				<GaugeChartSkeleton />
				<AdditionalStatInfoListSkeleton />
			</Flex>
		</CardSkeleton>
	);
};
