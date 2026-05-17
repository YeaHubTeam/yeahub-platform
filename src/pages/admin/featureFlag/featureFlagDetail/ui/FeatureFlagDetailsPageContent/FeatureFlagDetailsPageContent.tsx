import { useTranslation } from 'react-i18next';

import { FeatureFlags, i18Namespace } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Card } from '@/shared/ui/Card';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { FeatureFlagApiItem } from '@/entities/featureFlag';
import { UserRolesList } from '@/entities/user';

import { ToggleFeatureFlagStatus } from '@/features/featureFlags';

import styles from './FeatureFlagDetailsPageContent.module.css';

interface FeatureFlagDetailsPageContentProps {
	featureFlag: FeatureFlagApiItem;
}

export const FeatureFlagDetailsPageContent = ({
	featureFlag,
}: FeatureFlagDetailsPageContentProps) => {
	const { t } = useTranslation([i18Namespace.featureFlags]);
	return (
		<>
			<BackHeader></BackHeader>

			<Flex gap="20" align="start" justify="between">
				<Card withOutsideShadow className={styles.mainCard}>
					<Flex direction="column" gap="20" maxWidth>
						<Text variant="head2">{featureFlag.flag}</Text>
						<Text variant="body1">{featureFlag.description}</Text>
					</Flex>
				</Card>

				<Card withOutsideShadow className={styles.additionalCard}>
					<Flex direction="column" gap="16">
						<Flex align="start" direction="column" gap="16">
							<Text variant="body1" color="black-700">
								{t(FeatureFlags.DETAILS_ROLES)}
							</Text>
							<UserRolesList userRoles={featureFlag.roles ?? []} />
						</Flex>

						<Flex align="start" direction="column" gap="16">
							<Text variant="body1" color="black-700">
								{t(FeatureFlags.DETAILS_CLIENT_TYPE)}
							</Text>
							<Chip label={featureFlag.clientType}></Chip>
						</Flex>

						<Flex align="start" direction="column" gap="16">
							<Text variant="body1" color="black-700">
								{t(FeatureFlags.DETAILS_ACTIVITY)}
							</Text>
							<ToggleFeatureFlagStatus
								featureFlagId={featureFlag.id}
								enabled={featureFlag.enabled}
							/>
						</Flex>

						<Flex align="start" direction="column" gap="16">
							<Text variant="body1" color="black-700">
								{t(FeatureFlags.DETAILS_CREATED_AT)}
							</Text>
							<Chip
								theme="outlined"
								label={new Date(featureFlag.createdAt).toLocaleDateString()}
							></Chip>
						</Flex>

						<Flex align="start" direction="column" gap="16">
							<Text variant="body1" color="black-700">
								{t(FeatureFlags.DETAILS_UPDATED_AT)}
							</Text>
							<Chip
								theme="outlined"
								label={new Date(featureFlag.updatedAt).toLocaleDateString()}
							></Chip>
						</Flex>
					</Flex>
				</Card>
			</Flex>
		</>
	);
};
