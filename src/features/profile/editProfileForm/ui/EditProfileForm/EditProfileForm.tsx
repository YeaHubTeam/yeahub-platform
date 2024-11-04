/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useBlocker, useLocation } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile as ProfileI18 } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Flex } from '@/shared/ui/Flex';
import { Tabs } from '@/shared/ui/Tabs';

import { GetProfileResponse, useProfileQuery } from '@/entities/auth';

import { useUpdateProfileMutation } from '../../api/editProfileApi';
import { getTabs, mapFormToProfile, mapProfileToForm } from '../../helpers/editProfileFormHelpers';
import { editProfileSchema } from '../../model/lib/validation/editProfileSchema';
import { ProfileSchema } from '../../model/types/editProfileTypes';

import styles from './EditProfileForm.module.css';
import { EditProfileFormSkeleton } from './EditProfileForm.skeleton';

export const EditProfileForm = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	const { hash } = useLocation();
	const { data: userProfile, isLoading } = useProfileQuery();
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

	const blocker = useBlocker(
		({ currentLocation, nextLocation }) =>
			methods.formState.isDirty &&
			!methods.formState.isSubmitted &&
			currentLocation.pathname !== nextLocation.pathname,
	);

	useEffect(() => {
		if (userProfile) {
			methods.reset(mapProfileToForm(userProfile));
		}
	}, [methods, userProfile]);

	const onSubmit = (data: ProfileSchema) => {
		methods.reset();
		updateProfile(mapFormToProfile(userProfile as GetProfileResponse, data));
	};

	if (isLoading) return <EditProfileFormSkeleton />;

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
