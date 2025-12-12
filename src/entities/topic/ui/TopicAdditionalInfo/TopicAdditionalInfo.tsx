import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Topics } from '@/shared/config';
import { formatDate } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Topic } from '../../model/types/topic';

import styles from './TopicAdditionalInfo.module.css';

export interface TopicAdditionalInfoProps {
	topic: Topic;
	className?: string;
}

export const TopicAdditionalInfo = ({ topic, className }: TopicAdditionalInfoProps) => {
	const { t } = useTranslation(i18Namespace.topic);
	return (
		<Card className={classnames(styles['normal-height'], className)} withOutsideShadow>
			<Flex direction="column" gap="24">
				<Flex direction="column" gap="8">
					<Text variant="body3" color="black-700">
						{t(Topics.ADDITIONAL_INFO_SKILL)}:
					</Text>

					<Chip
						theme="outlined"
						label={topic.skill.title}
						prefix={
							<img
								src={topic.skill.imageSrc || ''}
								alt={topic.skill.title}
								style={{ width: 16, height: 16 }}
							/>
						}
					/>
				</Flex>

				<Flex direction="column" gap="8">
					<Text variant="body3" color="black-700">
						{t(Topics.ADDITIONAL_INFO_CREATED_AT)}:
					</Text>

					<Chip
						theme="outlined"
						label={topic.createdAt ? formatDate(new Date(topic.createdAt)) : '—'}
					/>
				</Flex>

				<Flex direction="column" gap="8">
					<Text variant="body3" color="black-700">
						{t(Topics.ADDITIONAL_INFO_UPDATED_AT)}:
					</Text>

					<Chip
						theme="outlined"
						label={topic.updatedAt ? formatDate(new Date(topic.updatedAt)) : '—'}
					/>
				</Flex>
			</Flex>
		</Card>
	);
};
