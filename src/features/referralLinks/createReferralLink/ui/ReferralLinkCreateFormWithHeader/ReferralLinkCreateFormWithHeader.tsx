import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useCreateReferralLinkMutation } from '../../api/createReferralLinkApi';
import { CreateRefferalLinkFormValues } from '../../model/types/refferalLinkCreateTypes';
import { ReferralLinkCreateFormCard } from '../ReferralLinkCreateFormCard/ReferralLinkCreateFormCard';

import styles from './ReferralLinkCreateFormWithHeader.module.css';

export const ReferralLinkCreateFormWithHeader = () => {
	const [createReferralLinkMutation, { isLoading }] = useCreateReferralLinkMutation();

	const { handleSubmit } = useFormContext<CreateRefferalLinkFormValues>();
	const { t } = useTranslation(i18Namespace.marketplace);

	const onCreateReferralLink = (data: CreateRefferalLinkFormValues) => {
		createReferralLinkMutation({ ...data }).unwrap();
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
					{t(Translation.SAVE, { ns: 'translation' })}
				</Button>
			</Flex>
			<ReferralLinkCreateFormCard />
		</Flex>
	);
};
