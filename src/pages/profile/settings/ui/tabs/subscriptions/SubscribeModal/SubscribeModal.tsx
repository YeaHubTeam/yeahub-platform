import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18n, i18Namespace, ROUTES, Subscription, Translation } from '@/shared/config';
import { EMAIL_VERIFY_SETTINGS_TAB, useAppSelector } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

import { getFullProfile, getIsVerified } from '@/entities/profile';

import { useLazyGetPaymentUrlQuery } from '../../../../api/getPaymentUrl';
import { subscriptionAgreeSchema } from '../../../../lib/validation/subscriptionAgreeSchema';
import { SubscriptionAgreeFormValues } from '../../../../model/types/subscriptionAgreeTypes';

import styles from './SubscribeModal.module.css';

const parseI18nText = (text: string) => text.split(/<processingLink>|<\/processingLink>/);

interface SubscribeModalProps {
	isOpen: boolean;
	onClose: () => void;
	subscriptionId: number;
}

export const SubscribeModal = ({ isOpen, onClose, subscriptionId }: SubscribeModalProps) => {
	const [getPaymentUrl] = useLazyGetPaymentUrlQuery();
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.subscription);

	const isEmailVerified = useAppSelector(getIsVerified);
	const profile = useAppSelector(getFullProfile);

	const methods = useForm<SubscriptionAgreeFormValues>({
		resolver: yupResolver(subscriptionAgreeSchema),
		mode: 'onTouched',
		defaultValues: {
			email: profile.email ?? '',
		},
	});

	const { control, trigger, watch } = methods;

	const email = watch('email');

	const offerAgreementParts = parseI18nText(
		t(Subscription.SUBSCRIBE_MODAL_PRIVACY_OFFER_AGREEMENT),
	);
	const consentParts = parseI18nText(t(Subscription.SUBSCRIBE_MODAL_PRIVACY_CONSENT));

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const isValid = await trigger();
		if (!isEmailVerified) {
			navigate(EMAIL_VERIFY_SETTINGS_TAB);
			return;
		}
		if (!isValid) return;
		try {
			const { data: paymentUrl } = await getPaymentUrl({ subscriptionId, email });
			if (paymentUrl) {
				window.location.href = paymentUrl;
			}
		} catch (error) {
			toast.error(i18n.t(Translation.TOAST_SUBSCRIPTIONS_SUBSCRIBE_FAILED));
			console.error('Payment error:', error);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} className={styles.modal} hasPadding={false}>
			<FormProvider {...methods}>
				<Flex direction="column" gap="30">
					<Text variant="body5-accent" className={styles.title}>
						{t(Subscription.SUBSCRIBE_MODAL_TITLE)}
					</Text>
					<Flex direction="column" gap="8">
						<FormControl name="email" control={control} className={styles['form-control']}>
							{(register, hasError) => (
								<Input
									{...register}
									error={hasError}
									placeholder={t(Subscription.SUBSCRIBE_MODAL_EMAIL_INPUT_VALUE)}
									disabled={!!profile.email}
								/>
							)}
						</FormControl>
						<Text variant="body1" color="black-600">
							{t(Subscription.SUBSCRIBE_MODAL_EMAIL_DESCRIPTION)}
						</Text>
					</Flex>
					<Flex direction="column" gap="16">
						<Text variant="body1" color="black-600">
							{t(Subscription.SUBSCRIBE_MODAL_PRIVACY_TITLE)}
						</Text>
						<Flex direction="column" gap="8">
							<FormControl
								name="isOfferAgreed"
								control={control}
								className={styles['form-control']}
							>
								{(field) => (
									<Checkbox
										{...field}
										label={
											<Text variant="body1" color="black-600">
												{offerAgreementParts[0]}
												<a href={ROUTES.docs.page} target="_blank" rel="noopener noreferrer">
													{' '}
													{offerAgreementParts[1]}
												</a>
												{offerAgreementParts[2]}
												<a href={ROUTES.docs.page} target="_blank" rel="noopener noreferrer">
													{' '}
													{offerAgreementParts[3]}
												</a>
											</Text>
										}
									/>
								)}
							</FormControl>
							<FormControl
								name="isConsentAgreed"
								control={control}
								className={styles['form-control']}
							>
								{(field) => (
									<Checkbox
										{...field}
										label={
											<Text variant="body1" color="black-600">
												{consentParts[0]}
												<a href={ROUTES.docs.page} target="_blank" rel="noopener noreferrer">
													{' '}
													{consentParts[1]}
												</a>
											</Text>
										}
									/>
								)}
							</FormControl>
						</Flex>
					</Flex>
					<Button size="large" fullWidth onClick={handleSubmit}>
						{t(Subscription.SUBSCRIBE_MODAL_BUTTON)}
					</Button>
				</Flex>
			</FormProvider>
		</Modal>
	);
};
