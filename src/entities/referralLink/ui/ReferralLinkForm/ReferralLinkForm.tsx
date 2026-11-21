import { ChangeEvent } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, ReferralLinks } from '@/shared/config';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';

import { UserSelect } from '@/entities/user/@x/referralLink';

import { ReferralLink } from '../../model/types/referralLinks';

import styles from './ReferralLinkForm.module.css';

interface ReferralLinkFormProps {
	userId?: string;
	referralLink?: ReferralLink;
}

export const ReferralLinkForm = ({ userId, referralLink }: ReferralLinkFormProps) => {
	const { t } = useTranslation(i18Namespace.referralLink);
	const { control, setValue } = useFormContext();

	const [refCode, ownerId] = useWatch({
		control,
		name: ['refCode', 'ownerId'],
	});

	const isOwnerChecked = Boolean(userId && ownerId === userId);
	const isOwnerChanged = Boolean(referralLink && ownerId !== referralLink.ownerId);

	const BASE_URL = `${process.env.APP_URL}?ref_id=`;

	const handleRefCodeChange = (value: string) => {
		setValue('url', value ? `${BASE_URL}${value}` : BASE_URL, {
			shouldDirty: true,
		});
	};

	return (
		<Flex direction="column" gap="60" className={styles.wrapper}>
			<FormField
				label={t(ReferralLinks.REF_CODE_SHORT)}
				description={t(ReferralLinks.REF_CODE_PLACEHOLDER)}
			>
				<FormControl name="refCode" control={control}>
					{(field, hasError) => (
						<Input
							{...field}
							placeholder={t(ReferralLinks.REF_CODE_PLACEHOLDER)}
							error={hasError}
							onChange={(e) => {
								field.onChange(e);
								handleRefCodeChange(e.target.value);
							}}
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
									key={referralLink ? (isOwnerChanged ? 'changed' : 'initial') : undefined}
									value={displayValue}
									onChange={(userId) => field.onChange(userId)}
									disabled={isOwnerChecked}
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
							setValue('ownerId', e.target.checked ? userId : '', {
								shouldDirty: true,
							});
						}}
					/>
				</Flex>
			</FormField>
		</Flex>
	);
};
