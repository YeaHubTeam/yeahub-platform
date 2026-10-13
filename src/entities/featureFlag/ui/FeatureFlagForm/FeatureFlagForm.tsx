import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FeatureFlags, i18Namespace } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { FormInputDescription } from '@/shared/ui/form';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { Switch } from '@/shared/ui/Switch';
import { Text } from '@/shared/ui/Text';

import { RoleSelect, useGetUserRolesListQuery } from '@/entities/user/@x/featureFlag';

import { CreateOrEditFeatureFlagFormValues } from '../../model/types/featureFlag';
import { FeatureFlagClientTypeSelect } from '../FeatureFlagClientTypeSelect/FeatureFlagClientTypeSelect';

import styles from './FeatureFlagForm.module.css';

interface FeatureFlagFormProps {
	isEdit?: boolean;
}

export const FeatureFlagForm = ({ isEdit }: FeatureFlagFormProps) => {
	const { t } = useTranslation(i18Namespace.featureFlags);

	const { control } = useFormContext<CreateOrEditFeatureFlagFormValues>();

	const { data: availableRoles = [] } = useGetUserRolesListQuery();

	return (
		<>
			<Text variant="body5-strong" isMainTitle className={styles['main-title']}>
				{isEdit ? t(FeatureFlags.EDIT_PAGE_TITLE) : t(FeatureFlags.CREATE_PAGE_TITLE)}
			</Text>

			<Flex direction="column" gap="60">
				<FormField
					description={t(FeatureFlags.FORM_FLAG_SUBTITLE)}
					label={t(FeatureFlags.FORM_FLAG_TITLE)}
				>
					<FormControl name="flag" control={control} className={`${styles['input-form']}`}>
						{(field, hasError) => (
							<Input
								{...field}
								error={hasError}
								placeholder={t(FeatureFlags.FORM_FLAG_PLACEHOLDER)}
							/>
						)}
					</FormControl>
				</FormField>

				<FormInputDescription
					name="description"
					label={t(FeatureFlags.FORM_DESCRIPTION_TITLE)}
					description={t(FeatureFlags.FORM_DESCRIPTION_SUBTITLE)}
					limit={1000}
					className={styles.textarea}
					direction="column"
				/>

				<FormField
					description={t(FeatureFlags.FORM_ROLES_SUBTITLE)}
					label={t(FeatureFlags.FORM_ROLES_TITLE)}
				>
					<FormControl name="roleIds" control={control}>
						{({ onChange, value }) => (
							<RoleSelect
								value={value}
								onChange={onChange}
								availableRoles={availableRoles}
								disabled={false}
							/>
						)}
					</FormControl>
				</FormField>

				<FormField
					description={t(FeatureFlags.FORM_CLIENT_TYPE_SUBTITLE)}
					label={t(FeatureFlags.FORM_CLIENT_TYPE_TITLE)}
				>
					<FormControl name="clientType" control={control}>
						{({ onChange, value }) => (
							<FeatureFlagClientTypeSelect
								label={t(FeatureFlags.FORM_CLIENT_TYPE_TITLE)}
								value={value}
								onChange={onChange}
							/>
						)}
					</FormControl>
				</FormField>

				<FormField
					description={t(FeatureFlags.FORM_ENABLED_SUBTITLE)}
					label={t(FeatureFlags.FORM_ENABLED_TITLE)}
				>
					<FormControl name="enabled" control={control}>
						{(field) => (
							<Switch
								checked={field.value}
								onChange={(event) => field.onChange(event.target.checked)}
								switchClassName={styles['switch-wrapper']}
								pinClassName={styles['switch-pin']}
							/>
						)}
					</FormControl>
				</FormField>
			</Flex>
		</>
	);
};
