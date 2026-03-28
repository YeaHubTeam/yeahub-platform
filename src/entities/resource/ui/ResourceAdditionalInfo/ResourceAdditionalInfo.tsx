import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Resources } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Author, AuthorInfo } from '@/shared/ui/AuthorInfo';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { KeywordsList } from '@/shared/ui/KeywordsList';
import { Text } from '@/shared/ui/Text';

import { Skill } from '@/entities/skill/@x/resource';
import { Specialization } from '@/entities/specialization/@x/resource';

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

	const onMoveToResourcesWithSpecialization = (specializationId: number) => {
		navigate(`${route}?page=1&specializations=` + encodeURIComponent(specializationId));
	};

	return (
		<Flex direction="column" gap="20">
			<Card className={classnames(styles['additional'], className)} withOutsideShadow>
				<Flex gap="24" direction="column">
					<BaseFilterSection
						title={t(Resources.SPECIALIZATION_TITLE)}
						data={specializations}
						onClick={onMoveToResourcesWithSpecialization}
					/>
					<BaseFilterSection
						title={t(Resources.ADDITIONAL_INFO_SKILLS)}
						data={resourceSkills}
						onClick={onMoveToResourcesWithSkills}
						isAllActive
					/>
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
