import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace, Translation } from '@/shared/config';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useProfileQuery } from '@/entities/auth';

import { ReferralLinkForm } from '@/features/referralLinks/createReferralLink/ui/ReferralLinkForm/ReferralLinkForm';

import { useCreateReferralLinkMutation } from '../../api/createReferralLinkApi';
import { CreateRefferalLinkFormValues } from '../../model/types/refferalLinkCreateTypes';

import styles from './ReferralLinkCreateFormWithHeader.module.css';

export const ReferralLinkCreateFormWithHeader = () => {
	const [createReferralLinkMutation, { isLoading }] = useCreateReferralLinkMutation();
	const profileQuery = useProfileQuery();
	const profile = profileQuery.data;

	const { handleSubmit } = useFormContext<CreateRefferalLinkFormValues>();
	const { t } = useTranslation(i18Namespace.marketplace);

	const onCreateReferralLink = async (data: CreateRefferalLinkFormValues) => {
		try {
			await createReferralLinkMutation({ ...data }).unwrap();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Flex componentType="main" gap="24" className={styles.wrapper}>
			<div className={styles.back}>
				<BackButton />
			</div>
			<Flex gap="20" align="center" className={styles.buttons}>
				<Button
					disabled={isLoading}
					className={styles['submit-button']}
					onClick={handleSubmit(onCreateReferralLink)}
					type="submit"
				>
					{isLoading
						? t(Translation.LOADING, { ns: 'translation' })
						: t(Translation.SAVE, { ns: 'translation' })}
				</Button>
			</Flex>
			<Card className={styles.content}>
				<Flex direction="column" gap="28">
					<Text variant="body5-strong" color="black-900">
						{t(Marketplace.ADD_RESOURCE_TITLE)}
					</Text>
					<ReferralLinkForm
						currentUserId={profile?.id}
						currentUserLabel={profile?.username || profile?.email || ''}
					/>
				</Flex>
			</Card>
		</Flex>
	);
};
