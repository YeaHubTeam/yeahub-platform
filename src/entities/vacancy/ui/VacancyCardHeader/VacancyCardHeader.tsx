import { useGetCurrentDay } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { VacancyCompany } from '../../model/types/vacancy';

import styles from './VacancyCardHeader.module.css';

interface VacancyCardHeaderProps {
	company: VacancyCompany;
	sourcePublishedAt: string;
	title: string;
}

export const VacancyCardHeader = ({
	company,
	sourcePublishedAt,
	title,
}: VacancyCardHeaderProps) => {
	const { imageSrc, title: companyTitle } = company;

	const publishedDate = useGetCurrentDay(sourcePublishedAt);

	return (
		<Flex gap="12" wrap="wrap" justify="between">
			<Flex gap="12" align="end">
				<ImageWithWrapper
					src={imageSrc ?? undefined}
					alt={companyTitle}
					className={styles['image-wrapper']}
				/>
				<Text variant="body3" color="black-400">
					{companyTitle}
				</Text>
			</Flex>
			<StatusChip status={{ text: `${publishedDate}`, variant: 'green' }} />
			<Text variant="body6" className={styles.title}>
				{title}
			</Text>
		</Flex>
	);
};
