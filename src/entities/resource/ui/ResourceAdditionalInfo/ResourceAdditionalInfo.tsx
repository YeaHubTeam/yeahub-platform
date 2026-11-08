import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Resources } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Author, AuthorInfo } from '@/shared/ui/AuthorInfo';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { Skill } from '@/entities/skill/@x/resource';
import { Specialization } from '@/entities/specialization/@x/resource';

import styles from './ResourceAdditionalInfo.module.css';

export interface ResourceAdditionalInfoProps {
	specializations: Specialization[];
	resourceSkills: Skill[];
	createdBy?: Author;
	className?: string;
	showAuthor?: boolean;
}

export const ResourceAdditionalInfo = ({
	resourceSkills,
	specializations,
	createdBy,
	className = '',
	showAuthor = true,
}: ResourceAdditionalInfoProps) => {
	const { isMobile, isTablet } = useScreenSize();

	const { t } = useTranslation(i18Namespace.resources);

	return (
		<Flex direction="column" gap="20">
			<Card className={classnames(styles['additional'], className)} withOutsideShadow>
				<Flex gap="24" direction="column">
					<BaseFilterSection title={t(Resources.SPECIALIZATION_TITLE)} data={specializations} />
					<BaseFilterSection
						title={t(Resources.ADDITIONAL_INFO_SKILLS)}
						data={resourceSkills}
						isAllActive
					/>
				</Flex>
			</Card>
			{showAuthor && createdBy && !isMobile && !isTablet && (
				<AuthorInfo createdBy={createdBy} isCenter />
			)}
		</Flex>
	);
};
