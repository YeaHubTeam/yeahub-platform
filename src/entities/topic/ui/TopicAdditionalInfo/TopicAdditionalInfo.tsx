import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Topics } from '@/shared/config';
import { formatDate } from '@/shared/libs';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

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
				<BaseFilterSection
					title={t(Topics.ADDITIONAL_INFO_SKILL)}
					data={[topic.skill]}
					isAllActive
				/>
				<BaseFilterSection
					title={t(Topics.ADDITIONAL_INFO_CREATED_AT)}
					data={[
						{
							id: 'createdAt',
							title: formatDate(new Date(topic.createdAt), 'dd.MM.yyyy'),
						},
					]}
					isAllActive
				/>
				<BaseFilterSection
					title={t(Topics.ADDITIONAL_INFO_UPDATED_AT)}
					data={[
						{
							id: 'updatedAt',
							title: formatDate(new Date(topic.updatedAt), 'dd.MM.yyyy'),
						},
					]}
					isAllActive
				/>
			</Flex>
		</Card>
	);
};
