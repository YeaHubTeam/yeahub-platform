import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import { QuestionGradeListSkeleton } from '@/entities/question';

import styles from './CollectionBody.module.css';

export const CollectionBodySkeleton = () => {
	const { isMobile, isMobileS } = useScreenSize();
	const { t } = useTranslation(i18Namespace.questions);
	return (
		<Card className={styles.wrapper} withOutsideShadow title={t(Questions.PREVIEW_TITLE)}>
			<Flex componentType="ul" direction="column" gap="12">
				{[...Array(4)].map((_, index) => (
					<Flex key={index} gap="8" className={styles.question}>
						{!isMobileS && <Skeleton width={70} height={50} />}
						<Flex direction="column" gap="8">
							<Skeleton width={isMobileS ? 200 : 250} height={21} />
							<Flex gap={isMobile ? '12' : '24'}>
								<QuestionGradeListSkeleton size="small" />
							</Flex>
						</Flex>
					</Flex>
				))}
			</Flex>
		</Card>
	);
};
