import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Questions, ROUTES } from '@/shared/config';
import { route, useCurrentProject, useScreenSize } from '@/shared/libs';
import { Author, AuthorInfo } from '@/shared/ui/AuthorInfo';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { KeywordsList } from '@/shared/ui/KeywordsList';
import { Text } from '@/shared/ui/Text';

import { Skill } from '@/entities/skill/@x/question';
import { Media, MediaLinksBanner } from '@/entities/socialMedia/@x/question';
import { Specialization } from '@/entities/specialization/@x/question';
import { Topic } from '@/entities/topic/@x/question';

import { QuestionGradeList } from '../QuestionGradeList/QuestionGradeList';

import styles from './QuestionAdditionalInfo.module.css';

export interface QuestionAdditionalInfoProps {
	rate: number;
	complexity: number;
	keywords: string[];
	questionSkills: Skill[];
	questionSpecializations: Specialization[];
	questionTopics?: Topic[];
	createdBy: Author;
	className?: string;
	route?: string;
	showAuthor?: boolean;
	media?: Media;
}

export const QuestionAdditionalInfo = ({
	rate,
	complexity,
	questionSkills,
	questionSpecializations,
	questionTopics,
	keywords,
	createdBy,
	className,
	route: baseRoute,
	showAuthor = true,
	media,
}: QuestionAdditionalInfoProps) => {
	const navigate = useNavigate();
	const { isMobile, isTablet } = useScreenSize();

	const { t } = useTranslation(i18Namespace.questions);

	const onMoveToQuestionsWithSpecializations = (specializationId: number) => {
		navigate(
			`${baseRoute}?page=1&status=all&specializations=` + encodeURIComponent(specializationId),
		);
	};

	const onMoveToQuestionsWithSkills = (skillId: number) => {
		navigate(`${baseRoute}?page=1&status=all&skills=` + encodeURIComponent(skillId));
	};

	const onMoveToTopicPage = (topicId: number) => {
		navigate(route(ROUTES.admin.topics.details.page, topicId));
	};
	const project = useCurrentProject();
	return (
		<>
			<Card className={classnames(styles['normal-height'], className)} withOutsideShadow>
				<Flex direction="column" gap="24">
					<Flex direction="column" gap="8">
						<Text variant="body2" color="black-700">
							{t(Questions.ADDITIONAL_INFO_LEVEL)}
						</Text>
						<QuestionGradeList rate={rate} complexity={complexity} />
					</Flex>
					{project === 'admin' && (
						<BaseFilterSection
							title={t(Questions.SPECIALIZATION_TITLE)}
							data={questionSpecializations}
							onClick={onMoveToQuestionsWithSpecializations}
							isAllActive
						/>
					)}
					<BaseFilterSection
						title={t(Questions.ADDITIONAL_INFO_SKILLS)}
						data={questionSkills}
						onClick={onMoveToQuestionsWithSkills}
						isAllActive
					/>
					{project === 'admin' && questionTopics && questionTopics.length > 0 && (
						<BaseFilterSection
							title={t(Questions.TOPIC_TITLE)}
							data={questionTopics}
							onClick={onMoveToTopicPage}
							isAllActive
						/>
					)}
					<Flex direction="column" gap="8">
						<Text variant="body2" color="black-700">
							{t(Questions.ADDITIONAL_INFO_KEYWORDS)}
						</Text>
						<KeywordsList keywords={keywords} path={`${route}?page=1&status=all&$keywords=`} />
					</Flex>
					{showAuthor && createdBy && (isMobile || isTablet) && (
						<AuthorInfo createdBy={createdBy} />
					)}
					{media && <MediaLinksBanner mediaLink={media} />}
				</Flex>
			</Card>
			{showAuthor && createdBy && !isMobile && !isTablet && (
				<AuthorInfo createdBy={createdBy} isCenter />
			)}
		</>
	);
};
