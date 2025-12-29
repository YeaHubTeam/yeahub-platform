import { useScreenSize } from '@/shared/libs';
import { StatInfoItem } from '@/shared/ui/AdditionalStatInfoGauge/types';
import { Card, CardProps } from '@/shared/ui/Card';
import { GaugeChart } from '@/shared/ui/charts';
import { Flex } from '@/shared/ui/Flex';

import { AdditionalStatInfoList } from '../AdditionalStatInfoList/AdditionalStatInfoList';

import styles from './AdditionalStatInfoGauge.module.css';

export type AdditionalStatInfoGaugeProps = {
	statsInfo: StatInfoItem[];
	total: number;
	learned: number;
	isLoading?: boolean;
} & CardProps;

export const AdditionalStatInfoGauge = ({
	statsInfo,
	learned,
	total,
	isLoading,
	...cardProps
}: AdditionalStatInfoGaugeProps) => {
	const { isTablet } = useScreenSize();
	return (
		<Card {...cardProps} isTitleCenter={isTablet}>
			<Flex direction="column" justify="center" align="center" gap="24" className={styles.wrapper}>
				<GaugeChart total={total} learned={learned} />
				<AdditionalStatInfoList statsInfo={statsInfo} />
			</Flex>
		</Card>
	);
};
