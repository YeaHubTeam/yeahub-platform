import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, ReferralLinks } from '@/shared/config';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';

import { UserSelect } from '@/entities/user';

import styles from './ReferralLinkForm.module.css';

interface ReferralLinkFormProps {
	userId?: string;
}

export const ReferralLinkForm = ({ userId }: ReferralLinkFormProps) => {
	const { t } = useTranslation(i18Namespace.referralLink);
	const { control, watch, formState, setValue } = useFormContext();

	const refCode = watch('refCode');
	const [isOwnerChecked, setIsOwnerChecked] = useState(false);

	const handleRefCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue('refCode', e.target.value);

		if (e.target.value) {
			setValue('url', `${formState.defaultValues?.url}${e.target.value}`);
		} else {
			setValue('url', '');
		}
	};

	return (
		<Flex direction="column" gap="60" className={styles.wrapper}>
			<FormField
				label={t(ReferralLinks.REF_CODE_LABEL)}
				description={t(ReferralLinks.REF_CODE_PLACEHOLDER)}
			>
				<FormControl name="refCode" control={control}>
					{(field, hasError) => (
						<Input
							{...field}
							placeholder={t(ReferralLinks.REF_CODE_PLACEHOLDER)}
							error={hasError}
							onChange={handleRefCodeChange}
							maxLength={50}
						/>
					)}
				</FormControl>
			</FormField>
			<FormField label={t(ReferralLinks.URL_SHORT)} description={t(ReferralLinks.URL_LABEL)}>
				<FormControl name="url" control={control}>
					{(field, hasError) => (
						<Input
							{...field}
							placeholder={refCode ? '' : t(ReferralLinks.URL_PLACEHOLDER)}
							error={hasError}
							disabled
						/>
					)}
				</FormControl>
			</FormField>
			<FormField
				label={t(ReferralLinks.OWNER_USERNAME_SHORT)}
				description={t(ReferralLinks.OWNER_USERNAME_LABEL)}
			>
				<Flex direction="row" align="center" gap="16" className={styles['owner-field']}>
					<FormControl name="ownerId" control={control}>
						{(field) => {
							const displayValue = isOwnerChecked ? undefined : field.value;
							return (
								<UserSelect
									key={isOwnerChecked ? 'owner' : 'select'}
									value={displayValue}
									onChange={(userId) => {
										field.onChange(userId);
									}}
									disabled={false || isOwnerChecked}
									showLabel={false}
								/>
							);
						}}
					</FormControl>
					<Checkbox
						label={t(ReferralLinks.MY_OWNER_USERNAME)}
						className={styles['owner-checkbox']}
						checked={isOwnerChecked}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setIsOwnerChecked(e.target.checked);
							setValue('ownerId', e.target.checked ? userId : '');
						}}
					/>
				</Flex>
			</FormField>
		</Flex>
	);
};
