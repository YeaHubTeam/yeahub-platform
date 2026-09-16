import { useTranslation } from 'react-i18next';

import { FeatureFlags, i18Namespace } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { HeaderAdminPageDetailCard } from '@/shared/ui/HeaderAdminPageDetailCard';
import { Text } from '@/shared/ui/Text';

import { FeatureFlagApiItem } from '@/entities/featureFlag';
import { UserRolesList } from '@/entities/user';

import { useDeleteFeatureFlagMutation } from '@/features/featureFlag/deleteFeatureFlag';
import { ToggleActiveFeatureFlagSwitch } from '@/features/featureFlag/toggleActiveFeatureFlag';

import styles from './FeatureFlagDetailsPageContent.module.css';

interface FeatureFlagDetailsPageContentProps {
	featureFlag: FeatureFlagApiItem;
}

export const FeatureFlagDetailsPageContent = ({
	featureFlag,
}: FeatureFlagDetailsPageContentProps) => {
	const { t } = useTranslation([i18Namespace.featureFlags]);
	const [deleteFeatureFlag] = useDeleteFeatureFlagMutation();

	const handleDeleteFeatureFlag = () => {
		void deleteFeatureFlag(featureFlag.id);
	};

	return (
		<>
			<HeaderAdminPageDetailCard
				onDelete={handleDeleteFeatureFlag}
				deleteButtonProps={{
					tooltipTitle: FeatureFlags.TOOLTIP_FEATURE_FLAGS_DISABLED_INFO,
					modalMessage: FeatureFlags.MODAL_FEATURE_FLAG_DELETE_DESCRIPTION,
				}}
			/>

			<Flex gap="20" align="start" justify="between">
				<Card withOutsideShadow className={styles['main-card']}>
					<Flex direction="column" gap="20" maxWidth>
						<Text variant="body6">{featureFlag.flag}</Text>
						<Text variant="body3">{featureFlag.description}</Text>
					</Flex>
				</Card>

				<Card withOutsideShadow className={styles['additional-card']}>
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
							<ToggleActiveFeatureFlagSwitch id={featureFlag.id} enabled={featureFlag.enabled} />
						</Flex>

						<Flex align="start" direction="column" gap="16">
							<Text variant="body1" color="black-700">
								{t(FeatureFlags.DETAILS_CREATED_AT)}
							</Text>
							<Chip theme="outlined" label={new Date(featureFlag.createdAt).toLocaleDateString()} />
						</Flex>

						<Flex align="start" direction="column" gap="16">
							<Text variant="body1" color="black-700">
								{t(FeatureFlags.DETAILS_UPDATED_AT)}
							</Text>
							<Chip theme="outlined" label={new Date(featureFlag.updatedAt).toLocaleDateString()} />
						</Flex>
					</Flex>
				</Card>
			</Flex>
		</>
	);
};
