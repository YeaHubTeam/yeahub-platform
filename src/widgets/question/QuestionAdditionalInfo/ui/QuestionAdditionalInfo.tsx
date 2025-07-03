import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { KeywordsList } from '@/shared/ui/KeywordsList';
import { Text } from '@/shared/ui/Text';

import { Media, MediaLinksBanner } from '@/entities/media';
import { Author, QuestionAuthor, QuestionGradeList } from '@/entities/question';
import { Skill, SkillList } from '@/entities/skill';

import styles from './QuestionAdditionalInfo.module.css';

export interface QuestionAdditionalInfoProps {
	rate: number;
	complexity: number;
	keywords: string[];
	questionSkills: Skill[];
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
	keywords,
	createdBy,
	className,
	route,
	showAuthor = true,
	media,
}: QuestionAdditionalInfoProps) => {
	const navigate = useNavigate();
	const { isMobile, isTablet } = useScreenSize();

	const { t } = useTranslation(i18Namespace.questions);
	const onMoveToQuestionsWithSkills = (skillId: number) => {
		navigate(`${route}?page=1&status=all&skills=` + encodeURIComponent(skillId));
	};

	return (
		<>
			<Card className={classnames(styles['normal-height'], className)} withOutsideShadow>
				<Flex direction="column" gap="24">
					<Flex direction="column" gap="8">
						<Text variant="body3" color="black-700">
							{t(Questions.ADDITIONAL_INFO_LEVEL)}
						</Text>
						<QuestionGradeList rate={rate} complexity={complexity} />
					</Flex>
					<Flex direction="column" gap="8">
						<Text variant="body3" color="black-700">
							{t(Questions.ADDITIONAL_INFO_SKILLS)}
						</Text>
						<SkillList skills={questionSkills} onClick={onMoveToQuestionsWithSkills} />
					</Flex>
					<Flex direction="column" gap="8">
						<Text variant="body3" color="black-700">
							{t(Questions.ADDITIONAL_INFO_KEYWORDS)}
						</Text>
						<KeywordsList keywords={keywords} path={`${route}?page=1&status=all&$keywords=`} />
					</Flex>
					{showAuthor && createdBy && (isMobile || isTablet) && (
						<QuestionAuthor createdBy={createdBy} />
					)}
					{media && <MediaLinksBanner mediaLink={media} />}
				</Flex>
			</Card>
			{showAuthor && createdBy && !isMobile && !isTablet && (
				<QuestionAuthor createdBy={createdBy} isCenter />
			)}
		</>
	);
};
