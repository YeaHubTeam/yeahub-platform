import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Collections } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { AuthorInfo } from '@/shared/ui/AuthorInfo';
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
import { Media, MediaLinksBanner } from '@/entities/socialMedia';
import { SpecializationsList } from '@/entities/specialization';

import styles from './AdditionalInfo.module.css';

interface AdditionalInfoProps extends Pick<
	Collection,
	'specializations' | 'isFree' | 'company' | 'questionsCount' | 'createdBy' | 'keywords'
> {
	showAuthor?: boolean;
	className?: string;
	media?: Media | undefined;
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
	media,
}: AdditionalInfoProps) => {
	const { t } = useTranslation(i18Namespace.collection);
	const { isLargeScreen, isSmallScreen } = useScreenSize();

	return (
		<>
			<Card className={classnames(className)} withOutsideShadow>
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
					{isSmallScreen && showAuthor && createdBy && <AuthorInfo createdBy={createdBy} />}
					{media && <MediaLinksBanner mediaLink={media} />}
				</Flex>
			</Card>
			{isLargeScreen && showAuthor && createdBy && <AuthorInfo createdBy={createdBy} isCenter />}
		</>
	);
};
