import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FeatureFlagsTranslation, i18Namespace } from '@/shared/config';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { Switch } from '@/shared/ui/Switch';
import { Text } from '@/shared/ui/Text';
import { TextArea } from '@/shared/ui/TextArea';

import { RoleSelect, useGetUserRolesListQuery } from '@/entities/user/@x/featureFlag';

import { clientTypes, FEATURE_FLAG_DESCRIPTION_LIMIT } from '../../model/constants/featureFlags';
import { CreateOrEditFeatureFlagFormValues } from '../../model/types/featureFlag';

import styles from './FeatureFlagForm.module.css';

export const FeatureFlagForm = () => {
	const { t } = useTranslation(i18Namespace.featureFlags);
	const { control } = useFormContext<CreateOrEditFeatureFlagFormValues>();
	const { data: roles = [] } = useGetUserRolesListQuery();

	return (
		<Flex direction="column" className={styles.wrapper}>
			<Text variant="body6" className={styles['title-form']}>
				{t(FeatureFlagsTranslation.FORM_TITLE)}
			</Text>
			<Flex direction="column" gap="40">
				<FormField
					label={t(FeatureFlagsTranslation.FORM_FLAG_LABEL)}
					description={t(FeatureFlagsTranslation.FORM_FLAG_DESCRIPTION)}
				>
					<FormControl name="flag" control={control} className={styles['input-form']}>
						{(field, hasError) => (
							<Input
								{...field}
								placeholder={t(FeatureFlagsTranslation.FORM_FLAG_PLACEHOLDER)}
								error={hasError}
								size="L"
							/>
						)}
					</FormControl>
				</FormField>

				<FormField
					label={t(FeatureFlagsTranslation.FORM_DESCRIPTION_LABEL)}
					description={t(FeatureFlagsTranslation.FORM_DESCRIPTION_HINT)}
					direction="column"
				>
					<FormControl name="description" control={control} className={styles['input-form']}>
						{(field, hasError) => (
							<TextArea
								{...field}
								limit={FEATURE_FLAG_DESCRIPTION_LIMIT}
								className={styles['text-area']}
								state={hasError ? 'error' : 'default'}
								placeholder={t(FeatureFlagsTranslation.FORM_DESCRIPTION_PLACEHOLDER)}
							/>
						)}
					</FormControl>
				</FormField>

				<FormField
					label={t(FeatureFlagsTranslation.FORM_ROLES_LABEL)}
					description={t(FeatureFlagsTranslation.FORM_ROLES_HINT)}
				>
					<FormControl name="roleIds" control={control} className={styles['input-form']}>
						{({ value, onChange }) => (
							<RoleSelect
								value={(value as number[] | undefined) ?? []}
								onChange={onChange}
								availableRoles={roles}
							/>
						)}
					</FormControl>
				</FormField>

				<FormField
					label={t(FeatureFlagsTranslation.FORM_CLIENT_TYPE_LABEL)}
					description={t(FeatureFlagsTranslation.FORM_CLIENT_TYPE_HINT)}
				>
					<FormControl name="clientType" control={control} className={styles['input-form']}>
						{({ value, onChange }) => (
							<Dropdown
								size="L"
								label={t(FeatureFlagsTranslation.FORM_CLIENT_TYPE_LABEL)}
								value={String(value ?? '')}
								onSelect={(val) => onChange(String(val))}
							>
								{clientTypes.map((type) => (
									<Option key={type} value={type} label={type} />
								))}
							</Dropdown>
						)}
					</FormControl>
				</FormField>

				<FormField
					label={t(FeatureFlagsTranslation.FORM_ENABLED_LABEL)}
					description={t(FeatureFlagsTranslation.FORM_ENABLED_HINT)}
				>
					<FormControl name="enabled" control={control}>
						{({ value, onChange }) => (
							<Switch checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
						)}
					</FormControl>
				</FormField>
			</Flex>
		</Flex>
	);
};
