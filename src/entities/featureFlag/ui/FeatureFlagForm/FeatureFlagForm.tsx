import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FeatureFlags, i18Namespace } from '@/shared/config';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { Switch } from '@/shared/ui/Switch';
import { Text } from '@/shared/ui/Text';
import { TextEditor } from '@/shared/ui/TextEditor';

import { RoleSelect, useGetUserRolesListQuery } from '@/entities/user/@x/featureFlag';

import { clientTypes } from '../../model/constants/featureFlags';
import { CreateOrEditFeatureFlagFormValues } from '../../model/types/featureFlag';

import styles from './FeatureFlagForm.module.css';

export const FeatureFlagForm = () => {
	const { t } = useTranslation(i18Namespace.featureFlags);

	const { control } = useFormContext<CreateOrEditFeatureFlagFormValues>();

	const { data: availableRoles = [] } = useGetUserRolesListQuery();

	return (
		<>
			<Text variant="body5-strong" isMainTitle className={styles['main-title']}>
				{t(FeatureFlags.CREATE_PAGE_TITLE)}
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

				<FormField
					direction="column"
					description={t(FeatureFlags.FORM_DESCRIPTION_SUBTITLE)}
					label={t(FeatureFlags.FORM_DESCRIPTION_TITLE)}
				>
					<FormControl name="description" control={control}>
						{(field) => (
							<TextEditor
								id="description"
								isInline
								// className={styles.input}
								data={field.value}
								{...field}
								limit={1000}
							/>
						)}
					</FormControl>
				</FormField>

				<FormField
					description={t(FeatureFlags.FORM_ROLES_SUBTITLE)}
					label={t(FeatureFlags.FORM_ROLES_TITLE)}
				>
					<FormControl className={styles.select} name="roleIds" control={control}>
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
					<FormControl name="clientType" control={control} className={styles.difficulty}>
						{({ onChange, value }) => (
							<Dropdown
								width={320}
								label={t(FeatureFlags.FORM_CLIENT_TYPE_TITLE)}
								value={value}
								onSelect={(selectedValue) => onChange(selectedValue)}
							>
								{clientTypes.map((clientType) => (
									<Option key={clientType} value={clientType} label={clientType} />
								))}
							</Dropdown>
						)}
					</FormControl>
				</FormField>

				<FormField
					description={t(FeatureFlags.FORM_ENABLED_SUBTITLE)}
					label={t(FeatureFlags.FORM_ENABLED_TITLE)}
				>
					<FormControl name="enabled" control={control} className={styles.difficulty}>
						{(field) => (
							<Switch
								checked={field.value}
								onChange={(event) => field.onChange(event.target.checked)}
							/>
						)}
					</FormControl>
				</FormField>
			</Flex>
		</>
	);
};
