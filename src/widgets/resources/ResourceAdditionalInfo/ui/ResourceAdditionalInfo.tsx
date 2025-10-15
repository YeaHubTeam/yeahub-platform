import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Resources } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Author, AuthorInfo } from '@/shared/ui/AuthorInfo';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { KeywordsList } from '@/shared/ui/KeywordsList';
import { Text } from '@/shared/ui/Text';

import { Skill, SkillList } from '@/entities/skill';
import { Specialization, SpecializationsList } from '@/entities/specialization';

import styles from './ResourceAdditionalInfo.module.css';

export interface ResourceAdditionalInfoProps {
	keywords: string[];
	specializations: Specialization[];
	resourceSkills: Skill[];
	createdBy?: Author;
	className?: string;
	showAuthor?: boolean;
	route: string;
}

export const ResourceAdditionalInfo = ({
	resourceSkills,
	specializations,
	keywords,
	createdBy,
	className = '',
	route,
	showAuthor = true,
}: ResourceAdditionalInfoProps) => {
	const navigate = useNavigate();
	const { isMobile, isTablet } = useScreenSize();

	const { t } = useTranslation(i18Namespace.resources);
	const onMoveToResourcesWithSkills = (skillId: number) => {
		navigate(`${route}?page=1&status=all&skills=` + encodeURIComponent(skillId));
	};

	return (
		<Flex direction="column" gap="20">
			<Card className={classnames(styles['additional'], className)} withOutsideShadow>
				<Flex gap="24" direction="column">
					<SpecializationsList specializations={specializations} />

					<Flex direction="column" gap="8">
						<Text variant="body2" color="black-700">
							{t(Resources.ADDITIONAL_INFO_SKILLS)}
						</Text>
						<SkillList skills={resourceSkills} onClick={onMoveToResourcesWithSkills} />
					</Flex>

					<Flex direction="column" gap="8">
						<Text variant="body2" color="black-700">
							{t(Resources.ADDITIONAL_INFO_KEYWORDS)}
						</Text>
						<KeywordsList keywords={keywords} path={`${route}?page=1&status=all&$keywords=`} />
					</Flex>
				</Flex>
			</Card>
			{showAuthor && createdBy && !isMobile && !isTablet && (
				<AuthorInfo createdBy={createdBy} isCenter />
			)}
		</Flex>
	);
};
