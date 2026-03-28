import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Collections, ROUTES } from '@/shared/config';
import { Project, useCurrentProject, useScreenSize } from '@/shared/libs';
import { AuthorInfo } from '@/shared/ui/AuthorInfo';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { Collection } from '@/entities/collection';
import { Media, MediaLinksBanner } from '@/entities/socialMedia';

import styles from './AdditionalInfo.module.css';

interface AdditionalInfoProps
	extends Pick<
		Collection,
		| 'specializations'
		| 'isFree'
		| 'company'
		| 'questionsCount'
		| 'createdBy'
		| 'tasksCount'
		| 'keywords'
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
	tasksCount,
	createdBy,
	keywords,
	showAuthor = true,
	className,
	media,
}: AdditionalInfoProps) => {
	const { t } = useTranslation(i18Namespace.collection);
	const { isLargeScreen, isSmallScreen } = useScreenSize();
	const navigate = useNavigate();
	const project = useCurrentProject();

	const routes: Record<Project, string> = {
		admin: ROUTES.admin.collections.page,
		platform: ROUTES.wiki.collections.page,
	};

	const collectionAccess: BaseFilterItem<string>[] = [
		{
			id: isFree ? 'free' : 'premium',
			title: isFree ? t(Collections.TARIFF_FREE) : t(Collections.TARIFF_PAID),
		},
	];

	const questionCount: BaseFilterItem<string>[] = [
		{
			id: 'questionCount',
			title: String(questionsCount ?? 0),
		},
	];

	const taskCount: BaseFilterItem<string>[] = [
		{
			id: 'taskCount',
			title: String(tasksCount ?? 0),
		},
	];

	const onMoveToCollectionsWithSpecialization = (specializationId: number) => {
		navigate(`${routes[project]}?page=1&specializations=` + encodeURIComponent(specializationId));
	};

	const onMoveToCollectionsWithCompany = (companyId: string) => {
		navigate(`${routes[project]}?page=1&companies=` + encodeURIComponent(companyId));
	};

	const onMoveToCollectionsWithIsFree = (access: string) => {
		navigate(`${routes[project]}?page=1&isFree=` + encodeURIComponent(access === 'free'));
	};

	return (
		<>
			<Card className={classnames(className)} withOutsideShadow>
				<Flex direction="column" gap="24">
					<Flex direction="column" gap="8">
						<Text variant="body2" color="black-700" className={styles.title}>
							{t(Collections.TAGS_TITLE)}
						</Text>
						<div className={styles['keywords-wrapper']}>
							{keywords?.map((keyword) => (
								<StatusChip key={keyword} status={{ text: keyword, variant: 'green' }} />
							))}
						</div>
					</Flex>
					<BaseFilterSection
						title={t(Collections.SPECIALIZATION_TITLE)}
						data={specializations}
						onClick={onMoveToCollectionsWithSpecialization}
					/>
					<BaseFilterSection
						title={t(Collections.COMPANY_TITLE)}
						data={[company]}
						onClick={onMoveToCollectionsWithCompany}
						imageSize={36}
					/>
					<BaseFilterSection
						title={t(Collections.ADDITIONAL_INFO_ACCESS)}
						data={collectionAccess}
						onClick={onMoveToCollectionsWithIsFree}
					/>
					<BaseFilterSection
						chipClassName={styles.count}
						title={t(Collections.QUESTIONS_ADDITIONAL_INFO)}
						data={questionCount}
						isAllActive
					/>
					<BaseFilterSection
						chipClassName={styles.count}
						title={t(Collections.TASKS_ADDITIONAL_INFO)}
						data={taskCount}
						isAllActive
					/>
					{isSmallScreen && showAuthor && createdBy && <AuthorInfo createdBy={createdBy} />}
					{media && <MediaLinksBanner mediaLink={media} />}
				</Flex>
			</Card>
			{isLargeScreen && showAuthor && createdBy && <AuthorInfo createdBy={createdBy} isCenter />}
		</>
	);
};
