import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Specializations } from '@/shared/config';
import { AuthorInfo } from '@/shared/ui/AuthorInfo';
import { Card } from '@/shared/ui/Card';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import type { Specialization } from '../../model/types/specialization';

import styles from './SpecializationAdditionalInfo.module.css';

export interface SpecializationAdditionalInfoProps {
	className?: string;
	specialization: Specialization;
}

export const SpecializationAdditionalInfo = ({
	className,
	specialization,
}: SpecializationAdditionalInfoProps) => {
	const { t } = useTranslation(i18Namespace.specialization);

	const { createdAt, updatedAt, createdBy } = specialization;

	const showAuthor = !!createdBy;

	return (
		<Card className={classnames(styles['normal-height'], className)} withOutsideShadow>
			<Flex direction="column" gap="24">
				<Flex align="start" direction="column" gap="16">
					<Text variant="body2" color="black-700">
						{t(Specializations.DETAILS_CREATED_AT)}
					</Text>
					<Chip theme="outlined" label={new Date(createdAt).toLocaleDateString()} />
				</Flex>
				{updatedAt && (
					<Flex align="start" direction="column" gap="16">
						<Text variant="body2" color="black-700">
							{t(Specializations.DETAILS_UPDATED_AT)}
						</Text>
						<Chip theme="outlined" label={new Date(createdAt).toLocaleDateString()} />
					</Flex>
				)}
				{showAuthor && createdBy && <AuthorInfo createdBy={createdBy} />}
			</Flex>
		</Card>
	);
};
