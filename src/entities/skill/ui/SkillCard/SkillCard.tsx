import { useTranslation } from 'react-i18next';

import { Translation } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import { Skill } from '../../model/types/skill';

import styles from './SkillCard.module.css';

interface SkillCardProps {
	skill: Skill;
}

export const SkillCard = ({ skill }: SkillCardProps) => {
	const { t } = useTranslation();

	return (
		<Flex direction="column" gap="24" className={styles.wrap}>
			<Card withOutsideShadow>
				<Flex gap="16">
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
	);
};
