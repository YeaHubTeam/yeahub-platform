import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Topics } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Skill } from '@/entities/skill';

import styles from './TopicAdditionalInfo.module.css';

export interface TopicAdditionalInfoProps {
	skill?: Skill;
	createdAt?: string;
	updatedAt?: string;
	className?: string;
	showAuthor?: boolean;
}

export const TopicAdditionalInfo = ({ createdAt, updatedAt }: TopicAdditionalInfoProps) => {
	const { t } = useTranslation(i18Namespace.topic);

	return (
		// <Flex direction="column" gap="20">
		<Card className={classnames(styles['additional'])} withOutsideShadow>
			<Flex gap="24" direction="column">
				<Flex direction="column" gap="8">
					<Text variant="body2" color="black-700">
						{/* {createdAt} */}
						{/* {t(Landing.SKILLS_TITLE)}: */}
						<Text variant="body3" color="black-700">
							{t(Topics.SKILLS_SHORT)}:
						</Text>
						{/* <SkillList skills={topicSkills} onClick={onMoveToQuestionsWithSkills} /> */}
						{/* <SkillList skills={topicSkills} /> */}
					</Text>
				</Flex>

				<Flex direction="column" gap="8">
					<Text variant="body2" color="black-700">
						{t(Topics.CREATED_AT)}:
					</Text>
					<Text variant="body2" color="black-700">
						{createdAt}
					</Text>
					<Text variant="body2" color="black-700">
						{t(Topics.UPDATED_AT)}:
					</Text>
					<Text variant="body2" color="black-700">
						{updatedAt}
					</Text>
				</Flex>
			</Flex>
		</Card>
		// </Flex>
	);
};
