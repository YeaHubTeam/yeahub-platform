import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { StatInfoItem } from '@/shared/ui/AdditionalStatInfoGauge/model/types/types';
import { Card, CardProps } from '@/shared/ui/Card';
import { GaugeChart } from '@/shared/ui/charts/GaugeChart';
import { Flex } from '@/shared/ui/Flex';

import { AdditionalStatInfoList } from '../AdditionalStatInfoList/AdditionalStatInfoList';

import styles from './AdditionalStatInfoGauge.module.css';

export type AdditionalStatInfoGaugeProps = {
	statsInfo: StatInfoItem[];
	total: number;
	learned: number;
	isLoading?: boolean;
	isTitleCentered?: boolean;
} & CardProps;

export const AdditionalStatInfoGauge = ({
	statsInfo,
	learned,
	total,
	isLoading,
	isTitleCentered,
	...cardProps
}: AdditionalStatInfoGaugeProps) => {
	const { isDesktop, isLaptop, isTablet } = useScreenSize();
	const shouldCenterTitle =
		typeof isTitleCentered !== 'undefined' ? isTitleCentered : isDesktop || isLaptop || isTablet;
	return (
		<Card {...cardProps} isTitleCenter={shouldCenterTitle}>
			<Flex direction="column" justify="center" align="center" gap="24" className={styles.wrapper}>
				<GaugeChart total={total} learned={learned} />
				<AdditionalStatInfoList statsInfo={statsInfo} />
			</Flex>
		</Card>
	);
};
