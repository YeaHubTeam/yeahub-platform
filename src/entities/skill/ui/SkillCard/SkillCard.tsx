import { useTranslation } from 'react-i18next';

import { ROUTES, Translation } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import { Skill } from '../../model/types/skill';
import { SkillAdditionalInfo } from '../SkillAdditionalInfo/SkillAdditionalInfo';

import styles from './SkillCard.module.css';

interface SkillCardProps {
	skill: Skill;
}

export const SkillCard = ({ skill }: SkillCardProps) => {
	const { t } = useTranslation();

	const { createdAt, updatedAt, specializations, createdBy } = skill;

	return (
		<Flex gap="20">
			<Flex direction="column" gap="20" flex={1}>
				<Card withOutsideShadow>
					<Flex gap="16" direction="row">
						<div className={styles['card-image-wrapper']}>
							<ImageWithWrapper
								src={skill.imageSrc}
								alt={`${t(Translation.LOGO)} ${skill.title}`}
								className={styles['card-image']}
							/>
						</div>
						<Text isMainTitle variant="body6">
							{skill.title}
						</Text>
					</Flex>
				</Card>

				<Card withOutsideShadow expandable>
					<Flex direction="column" gap="20">
						<Text variant="body5-accent">{skill.title}</Text>
						<Text variant="body3-accent">{skill.description}</Text>
					</Flex>
				</Card>
			</Flex>

			<Flex direction="column" gap="20" className={styles.additional}>
				<SkillAdditionalInfo
					skillSpecializations={specializations}
					updatedAt={updatedAt}
					createdAt={createdAt}
					createdBy={createdBy}
					route={ROUTES.admin.specializations.details.page}
				/>
			</Flex>
		</Flex>
	);
};
