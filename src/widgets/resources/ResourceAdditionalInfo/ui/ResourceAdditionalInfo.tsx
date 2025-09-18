import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Resources } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { AuthorInfo } from '@/shared/ui/AuthorInfo/AuthorInfo';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { KeywordsList } from '@/shared/ui/KeywordsList';

import { ResourceAuthor } from '@/entities/resource';
import { Skill, SkillList } from '@/entities/skill';
import { Specialization, SpecializationsList } from '@/entities/specialization';

import styles from './ResourceAdditionalInfo.module.css';

export interface ResourceAdditionalInfoProps {
	keywords: string[];
	specializations: Specialization[];
	resourceSkills: Skill[];
	createdBy: ResourceAuthor;
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
		<>
			<Card className={classnames(styles['normal-height'], className)} withOutsideShadow>
				<Flex direction="column" gap="24">
					<Flex direction="column" gap="8">
						<SpecializationsList specializations={specializations} />
					</Flex>
					<Flex direction="column" gap="8">
						{t(Resources.ADDITIONAL_INFO_SKILLS)}
						<SkillList skills={resourceSkills} onClick={onMoveToResourcesWithSkills} />
					</Flex>
					<Flex direction="column" gap="8">
						{t(Resources.ADDITIONAL_INFO_KEYWORDS)}
						<KeywordsList keywords={keywords} path={`${route}?page=1&status=all&$keywords=`} />
					</Flex>
					{showAuthor && createdBy && (isMobile || isTablet) && (
						<AuthorInfo createdBy={createdBy} />
					)}
				</Flex>
			</Card>
			{showAuthor && createdBy && !isMobile && !isTablet && (
				<AuthorInfo createdBy={createdBy} isCenter />
			)}
		</>
	);
};
