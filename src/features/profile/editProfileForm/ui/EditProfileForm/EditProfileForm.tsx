/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile, Translation } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';
import { Tabs } from '@/shared/ui/Tabs';

import { getFullProfile } from '@/entities/profile';
import { useGetSkillsListQuery } from '@/entities/skill';

import { useUpdateProfileMutation } from '../../api/editProfileApi';
import { getTabs, mapFormToProfile, mapProfileToForm } from '../../helpers/editProfileFormHelpers';
import { editProfileSchema } from '../../model/lib/validation/editProfileSchema';
import { ProfileSchema } from '../../model/types/editProfileTypes';

import styles from './EditProfileForm.module.css';
import { EditProfileFormSkeleton } from './EditProfileForm.skeleton';

export const EditProfileForm = () => {
	const { t } = useTranslation([i18Namespace.profile, i18Namespace.translation]);

	const { hash } = useLocation();
	const profile = useAppSelector(getFullProfile);

	const { isLoading: isLoadingSlilsList } = useGetSkillsListQuery({ limit: 100 });
	const [updateProfile, { isLoading: isUpdateProfileLoading }] = useUpdateProfileMutation();

	const tabs = getTabs(t);
	const [currentActiveTab, setCurrentActiveTab] = useState(() => {
		return tabs.find((tab) => tab.title === hash.slice(1))?.id ?? 0;
	});

	const methods = useForm<ProfileSchema>({
		resolver: yupResolver(editProfileSchema),
		mode: 'onTouched',
		defaultValues: mapProfileToForm(profile),
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;
	const onSubmit = (data: ProfileSchema) => {
		updateProfile(mapFormToProfile(profile, data));
	};

	if (isLoadingSlilsList) return <EditProfileFormSkeleton />;
	return (
		<section className={styles.section}>
			<Tabs
				title={t(Profile.EDIT_PAGE_TITLE)}
				tabs={tabs}
				tabToggle={currentActiveTab}
				setTabToggle={setCurrentActiveTab}
			/>
			<FormProvider {...methods}>
				<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						{tabs.map(({ id, Component }) => currentActiveTab === id && <Component key={id} />)}

						<Flex direction="column" align="end" className={styles['btn-container']}>
							<Button type="submit" disabled={isUpdateProfileLoading}>
								{t(Translation.SAVE, { ns: i18Namespace.translation })}
							</Button>
						</Flex>
					</form>
				</LeavingPageBlocker>
			</FormProvider>
		</section>
	);
};
