/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useBlocker, useLocation } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile as ProfileI18 } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Tabs } from '@/shared/ui/Tabs';

import { FullProfile, useProfileQuery } from '@/entities/auth';
import { useGetSkillsListQuery } from '@/entities/skill';

import { useUpdateProfileMutation } from '../../api/editProfileApi';
import { getTabs, mapFormToProfile, mapProfileToForm } from '../../helpers/editProfileFormHelpers';
import { editProfileSchema } from '../../model/lib/validation/editProfileSchema';
import { ProfileSchema } from '../../model/types/editProfileTypes';

import styles from './EditProfileForm.module.css';
import { EditProfileFormSkeleton } from './EditProfileForm.skeleton';

export const EditProfileForm = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	const { hash } = useLocation();
	const { data: userProfile, isLoading: isLoadingProfile } = useProfileQuery();
	const { isLoading: isLoadingSlilsList } = useGetSkillsListQuery({ limit: 100 });
	const [updateProfile, { isLoading: isUpdateProfileLoading }] = useUpdateProfileMutation();

	const tabs = getTabs(t);
	const [currentActiveTab, setCurrentActiveTab] = useState(() => {
		return tabs.find((tab) => tab.title === hash.slice(1))?.id ?? 0;
	});

	const methods = useForm<ProfileSchema>({
		resolver: yupResolver(editProfileSchema),
		mode: 'onTouched',
		defaultValues: userProfile ? mapProfileToForm(userProfile) : {},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	const blocker = useBlocker(
		({ currentLocation, nextLocation }) =>
			isDirty &&
			!isSubmitted &&
			!isSubmitting &&
			currentLocation.pathname !== nextLocation.pathname,
	);
	useEffect(() => {
		if (userProfile) {
			methods.reset(mapProfileToForm(userProfile));
		}
	}, [methods, userProfile]);

	const onSubmit = (data: ProfileSchema) => {
		methods.reset();
		updateProfile(mapFormToProfile(userProfile as FullProfile, data));
	};

	if (isLoadingProfile || isLoadingSlilsList) return <EditProfileFormSkeleton />;
	return (
		<section className={styles.section}>
			<Tabs
				title={t(ProfileI18.TABS_TITLE)}
				tabs={tabs}
				tabToggle={currentActiveTab}
				setTabToggle={setCurrentActiveTab}
			/>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					{tabs.map(({ id, Component }) => currentActiveTab === id && <Component key={id} />)}
					{blocker.state === 'blocked' ? (
						<BlockerDialog onCancel={blocker.reset} onOk={blocker.proceed} />
					) : null}
					<Flex direction="column" align="end" className={styles['btn-container']}>
						<Button type="submit" disabled={isUpdateProfileLoading}>
							{t(ProfileI18.BUTTONS_SAVE)}
						</Button>
					</Flex>
				</form>
			</FormProvider>
		</section>
	);
};
