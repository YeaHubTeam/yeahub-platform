import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, ReferralLinks } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { FormHeader } from '@/shared/ui/FormHeader';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';
import { Text } from '@/shared/ui/Text';

import { getUserId } from '@/entities/profile';
import { ReferralLinkForm, type ReferralLink } from '@/entities/referralLink';

import { useEditReferralLinkMutation } from '../../api/editReferralLinkApi';
import { referralLinkEditSchema } from '../../lib/validation/referralLinkEditSchema';
import { EditReferralLinkFormValues } from '../../model/types/referralEditPageTypes';

import styles from './ReferralLinkEditForm.module.css';

interface ReferralLinkEditFormProps {
	referralLink: ReferralLink;
}

export const ReferralLinkEditForm = ({ referralLink }: ReferralLinkEditFormProps) => {
	const { id, refCode, url, ownerId } = referralLink;

	const { t } = useTranslation(i18Namespace.referralLink);
	const userId = useAppSelector(getUserId);

	const methods = useForm<EditReferralLinkFormValues>({
		resolver: yupResolver(referralLinkEditSchema),
		mode: 'onTouched',
		defaultValues: {
			id,
			refCode,
			url,
			ownerId,
		},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	const [editReferralLinkMutation, { isLoading }] = useEditReferralLinkMutation();

	const onEditReferralLink = async (data: EditReferralLinkFormValues) => {
		await editReferralLinkMutation({
			...referralLink,
			...data,
		});
	};

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<FormHeader<EditReferralLinkFormValues>
						onSubmit={onEditReferralLink}
						isLoading={isLoading}
					/>
					<Card className={styles.content}>
						<Flex direction="column" gap="28">
							<Text variant="body5-strong" color="black-900">
								{t(ReferralLinks.REF_CODE_TITLE)}
							</Text>
							<ReferralLinkForm userId={userId} referralLink={referralLink} />
						</Flex>
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
