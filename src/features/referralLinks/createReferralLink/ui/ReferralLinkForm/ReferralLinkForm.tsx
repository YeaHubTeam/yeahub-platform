import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace } from '@/shared/config';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';

import { UserSelect } from '@/entities/user';

import styles from './ReferralLinkForm.module.css';

interface ReferralLinkFormProps {
	readonly?: boolean;
	currentUserId?: string;
	currentUserLabel?: string;
}

export const ReferralLinkForm = ({
	readonly,
	currentUserId,
	currentUserLabel,
}: ReferralLinkFormProps) => {
	const { t } = useTranslation(i18Namespace.marketplace);
	const { control, watch, setValue } = useFormContext();

	const refCode = watch('refCode');

	const [isOwnerChecked, setIsOwnerChecked] = useState(false);

	const DOMAIN = 'yeahub';
	const BASE_URL = `https://app.${DOMAIN}.ru?ref_id=`;

	useEffect(() => {
		const cleaned = refCode?.toUpperCase().replace(/[^A-Z0-9]/g, '') || '';
		if (cleaned !== refCode) {
			setValue('refCode', cleaned);
		}

		if (cleaned) {
			setValue('url', `${BASE_URL}${cleaned}`);
		} else {
			setValue('url', '');
		}
	}, [refCode, setValue, BASE_URL]);

	useEffect(() => {
		if (isOwnerChecked && currentUserId) {
			setValue('ownerId', currentUserId);
		} else if (!isOwnerChecked) {
			setValue('ownerId', '');
		}
	}, [isOwnerChecked, currentUserId, setValue]);

	return (
		<Flex direction="column" gap="60" className={styles.wrapper}>
			<FormField
				label={t(Marketplace.REF_CODE_LABEL)}
				description={t(Marketplace.REF_CODE_PLACEHOLDER)}
			>
				<FormControl name="refCode" control={control}>
					{(field, hasError) => (
						<Input
							{...field}
							placeholder={t(Marketplace.REF_CODE_PLACEHOLDER)}
							error={hasError}
							disabled={readonly}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
								field.onChange(value);
							}}
							onKeyDown={(e: React.KeyboardEvent) => {
								if (e.key === ' ') e.preventDefault();
							}}
							maxLength={50}
						/>
					)}
				</FormControl>
			</FormField>
			<FormField label={t(Marketplace.URL_SHORT)} description={t(Marketplace.URL_LABEL)}>
				<FormControl name="url" control={control}>
					{(field, hasError) => (
						<Input
							{...field}
							placeholder={refCode ? '' : t(Marketplace.URL_PLACEHOLDER)}
							error={hasError}
							disabled={true}
							className={styles['readonly-input']}
						/>
					)}
				</FormControl>
			</FormField>
			<FormField
				label={t(Marketplace.OWNER_USERNAME_SHORT)}
				description={t(Marketplace.OWNER_USERNAME_LABEL)}
			>
				<Flex direction="row" align="center" gap="16" className={styles['owner-field']}>
					<FormControl name="ownerId" control={control}>
						{(field) => {
							const displayValue = isOwnerChecked && currentUserId ? currentUserId : field.value;
							return (
								<UserSelect
									key={isOwnerChecked ? 'owner' : 'select'}
									value={displayValue}
									onChange={(userId) => {
										if (!isOwnerChecked) {
											field.onChange(userId);
										}
									}}
									disabled={readonly || isOwnerChecked}
									showLabel={false}
									currentUserId={currentUserId}
									currentUserLabel={currentUserId || currentUserLabel || ''}
								/>
							);
						}}
					</FormControl>
					<Checkbox
						label={t(Marketplace.MY_OWNER_USERNAME)}
						className={styles['owner-checkbox']}
						checked={isOwnerChecked}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setIsOwnerChecked(e.target.checked)
						}
						disabled={readonly}
					/>
				</Flex>
			</FormField>
		</Flex>
	);
};
