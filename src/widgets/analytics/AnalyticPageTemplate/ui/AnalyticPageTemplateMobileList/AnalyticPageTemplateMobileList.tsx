import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { AnalyticPageTemplateMobileListItem } from '../../model/types/types';

import styles from './AnalyticPageTemplateMobileList.module.css';

interface AnalyticPageTemplateMobileListProps {
	items: AnalyticPageTemplateMobileListItem[];
}

export const AnalyticPageTemplateMobileList = ({ items }: AnalyticPageTemplateMobileListProps) => {
	return (
		<Flex componentType="ul" direction="column" gap="16">
			{items.map((item) => (
				<li key={item.title}>
					<Card className={styles.card}>
						<Flex gap="12" direction="column">
							{item.badge && (
								<StatusChip
									status={{
										text: item.badge,
										variant: 'green',
									}}
								/>
							)}
							{item.imageSrc && <ImageWithWrapper src={item.imageSrc} className={styles.icon} />}
							<Text variant={'body3-accent'}>{item.title}</Text>
							{item.fields.map((field) => (
								<>
									<Flex justify="between">
										<Text variant={'body3-accent'}>{field.label}</Text>
										<Text variant={'body3-accent'}>{field.value}</Text>
									</Flex>
								</>
							))}
						</Flex>
					</Card>
				</li>
			))}
		</Flex>
	);
};
