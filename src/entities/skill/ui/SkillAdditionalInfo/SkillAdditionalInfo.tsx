import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Skills } from '@/shared/config';
import { formatDate, route } from '@/shared/libs';
import { Author, AuthorInfo } from '@/shared/ui/AuthorInfo';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Specialization } from '@/entities/specialization/@x/skill';

import styles from './SkillAdditionalInfo.module.css';

export interface SkillAdditionalInfoProps {
	skillSpecializations: Specialization[];
	updatedAt: string | null;
	createdAt: string;
	route: string;
	createdBy: Author;
	className?: string;
}

export const SkillAdditionalInfo = ({
	skillSpecializations,
	updatedAt,
	createdAt,
	route: baseRoute,
	createdBy,
	className,
}: SkillAdditionalInfoProps) => {
	const navigate = useNavigate();

	const { t } = useTranslation(i18Namespace.skill);

	const onMoveToSpecializationPage = (specializationId: number) => {
		navigate(route(baseRoute, specializationId));
	};

	return (
		<Card className={classnames(styles['normal-height'], className)}>
			<Flex direction="column" gap="24">
				<BaseFilterSection
					title={`${t(Skills.SPECIALIZATIONS_TITLE)}:`}
					data={skillSpecializations}
					onClick={onMoveToSpecializationPage}
				/>

				{updatedAt && (
					<BaseFilterSection
						title={`${t(Skills.UPDATED_AT)}:`}
						data={[
							{
								id: 'updatedAt',
								title: formatDate(new Date(updatedAt), 'dd.MM.yyyy'),
							},
						]}
						isAllActive
					/>
				)}
				<BaseFilterSection
					title={`${t(Skills.CREATED_AT)}:`}
					data={[
						{
							id: 'createdAt',
							title: formatDate(new Date(createdAt), 'dd.MM.yyyy'),
						},
					]}
					isAllActive
				/>

				<Flex direction="column" gap="8">
					<Text variant="body2" color="black-700">
						{createdBy ? (
							<AuthorInfo createdBy={createdBy} />
						) : (
							<span>{`${t(Skills.AUTHOR)}:`} -</span>
						)}
					</Text>
				</Flex>
			</Flex>
		</Card>
	);
};
