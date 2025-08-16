/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';
import { Tabs } from '@/shared/ui/Tabs';
import { Text } from '@/shared/ui/Text';

import { getFullProfile } from '@/entities/profile';

import { useUpdateProfileMutation } from '../../api/editProfileApi';
import { useGetEditProfileTabs } from '../../model/hooks/useGetEditProfileTabs';
import { mapFormToProfile, mapProfileToForm } from '../../model/lib/helpers/editProfileFormHelpers';
import { editProfileSchema } from '../../model/lib/validation/editProfileSchema';
import { ProfileSchema } from '../../model/types/editProfileTypes';

import styles from './EditProfileForm.module.css';

export const EditProfileForm = () => {
	const navigate = useNavigate();
	const { t } = useTranslation([i18Namespace.profile, i18Namespace.translation]);

	const profile = useAppSelector(getFullProfile);

	const [updateProfile, { isLoading: isUpdateProfileLoading }] = useUpdateProfileMutation();

	const { tabs, setActiveTab, activeTab } = useGetEditProfileTabs();

	const methods = useForm<ProfileSchema>({
		resolver: yupResolver(editProfileSchema),
		mode: 'onTouched',
		defaultValues: mapProfileToForm(profile),
	});
	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	const onSubmit = (data: ProfileSchema) => {
		updateProfile(mapFormToProfile(profile, data))
			.unwrap()
			.then(() => {
				methods.reset(mapProfileToForm(profile));
				navigate(ROUTES.profile.page);
			});
	};

	return (
		<Card>
			<Text variant="body5-strong" isMainTitle className={styles.title}>
				{t(Profile.EDIT_PAGE_TITLE)}
			</Text>
			<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
			<FormProvider {...methods}>
				<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						{tabs.map(({ id, Component }) => activeTab.id === id && <Component key={id} />)}

						<Flex direction="column" align="end" className={styles['btn-container']}>
							<Button type="submit" disabled={isUpdateProfileLoading}>
								{t(Translation.SAVE, { ns: i18Namespace.translation })}
							</Button>
						</Flex>
					</form>
				</LeavingPageBlocker>
			</FormProvider>
		</Card>
	);
};
