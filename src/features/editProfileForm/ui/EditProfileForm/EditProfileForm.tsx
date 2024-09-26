/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useBlocker, useLocation } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Flex } from '@/shared/ui/Flex';
import { Loader } from '@/shared/ui/Loader';
import { Tabs } from '@/shared/ui/Tabs';

import { useProfileQuery } from '@/entities/auth';
import { Profile, useGetProfileByIdQuery } from '@/entities/profile';

import { useUpdateProfileMutation } from '../../api/editProfileApi';
import { getTabs, mapFormToProfile, mapProfileToForm } from '../../helpers/editProfileFormHelpers';
import { editProfileSchema } from '../../model/lib/validation/editProfileSchema';
import { ProfileSchema } from '../../model/types/editProfileTypes';

import styles from './EditProfileForm.module.css';

export const EditProfileForm = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	const { hash } = useLocation();
	const { data: profile } = useProfileQuery();
	const [updateProfile, { isLoading: isUpdateProfileLoading }] = useUpdateProfileMutation();
	const profileId = profile?.profiles[0].profileId;

	const { data: userProfile, isLoading } = useGetProfileByIdQuery(profileId as string);

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

	if (isLoading) {
		return <Loader />;
	}

	const onSubmit = (data: ProfileSchema) => {
		methods.reset();
		updateProfile(mapFormToProfile(userProfile as Profile, data));
	};

	return (
		<section className={styles.section}>
			<Tabs
				title={t('tabs.title')}
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
							Сохранить
						</Button>
					</Flex>
				</form>
			</FormProvider>
		</section>
	);
};
