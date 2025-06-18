import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import {
	CollectionAccessInfo,
	Collection,
	CollectionCompanyInfo,
	CollectionQuestionsCount,
} from '@/entities/collection';
import { QuestionAuthor } from '@/entities/question';
import { SpecializationsList } from '@/entities/specialization';

import styles from './AdditionalInfo.module.css';

interface AdditionalInfoProps
	extends Pick<
		Collection,
		'specializations' | 'isFree' | 'company' | 'questionsCount' | 'createdBy' | 'keywords'
	> {
	showAuthor?: boolean;
	className?: string;
}

export const AdditionalInfo = ({
	specializations,
	isFree,
	company,
	questionsCount,
	createdBy,
	keywords,
	showAuthor = true,
	className,
}: AdditionalInfoProps) => {
	const { t } = useTranslation(i18Namespace.collection);
	const { isLargeScreen, isSmallScreen } = useScreenSize();

	return (
		<>
			<Card className={classnames(styles['normal-height'], className)} withOutsideShadow>
				<Flex direction="column" gap="24">
					<Flex direction="column" gap="8">
						<Text variant="body3" color="black-700" className={styles.title}>
							{t(Collections.TAGS_TITLE)}
						</Text>
						<div className={styles['keywords-wrapper']}>
							{keywords?.map((keyword) => (
								<StatusChip key={keyword} status={{ text: keyword, variant: 'green' }} />
							))}
						</div>
					</Flex>
					<SpecializationsList specializations={specializations} />
					<CollectionCompanyInfo company={company} />
					<CollectionAccessInfo isFree={isFree} />
					<CollectionQuestionsCount questionsCount={questionsCount} />
					{isSmallScreen && showAuthor && createdBy && <QuestionAuthor createdBy={createdBy} />}
				</Flex>
			</Card>
			{isLargeScreen && showAuthor && createdBy && (
				<QuestionAuthor createdBy={createdBy} isCenter />
			)}
		</>
	);
};
