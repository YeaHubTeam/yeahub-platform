/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Tabs } from '@/shared/ui/Tabs';

import { useProfileQuery } from '@/entities/auth';
import { useGetProfileByIdQuery } from '@/entities/profile';
import { useUpdateProfileMutation } from '@/entities/user';

import { getTabs, mapProfileToForm } from '../helpers';
import { profileSchema } from '../model/lib/validation/profileSchema';
import { ProfileSchema } from '../model/types/profileTypes';

import style from './EditProfileForm.module.css';

export const EditProfileForm = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	const { hash } = useLocation();
	const { data: profile } = useProfileQuery();
	const [updateProfile] = useUpdateProfileMutation();
	const profileId = profile?.profiles[0].profileId;

	const { data: userProfile } = useGetProfileByIdQuery(profileId as string);

	const tabs = getTabs(t);
	const [currentActiveTab, setCurrentActiveTab] = useState(() => {
		return tabs.find((tab) => tab.title === hash.slice(1))?.id ?? 0;
	});

	const methods = useForm<ProfileSchema>({
		resolver: yupResolver(profileSchema),
		mode: 'onTouched',
		defaultValues: userProfile ? mapProfileToForm(userProfile) : {},
	});

	useEffect(() => {
		if (userProfile) {
			methods.reset(mapProfileToForm(userProfile));
		}
	}, [methods, userProfile]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSubmit = (data: any) => {
		// eslint-disable-next-line no-console
		console.log(data);
		updateProfile({
			...data,
			id: profileId ?? '',
		});
		// Раскомментировать при необходимости стирать поля
		// methods.reset();
	};

	return (
		<section className={style.section}>
			<Tabs
				title={t('tabs.title')}
				tabs={tabs}
				tabToggle={currentActiveTab}
				setTabToggle={setCurrentActiveTab}
			/>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					{tabs.map(({ id, Component }) => currentActiveTab === id && <Component key={id} />)}
				</form>
			</FormProvider>
		</section>
	);
};
