import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Onboarding } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Text } from '@/shared/ui/Text';

import { getFullProfile, getIsEmptySpecialization, getSpecializationId } from '@/entities/profile';
import { SpecializationSelect } from '@/entities/specialization';

import { useUpdateProfileMutation } from '@/features/profile/editProfileForm';

import { LayoutStepComponent } from '../LayoutStepComponent/LayoutStepComponent';

import styles from './ChooseSpecializationStep.module.css';

interface ChooseSpecializationStepProps {
	goNextStep?: () => void;
}

export const ChooseSpecializationStep = ({ goNextStep }: ChooseSpecializationStepProps) => {
	const { t } = useTranslation(i18Namespace.onboarding);
	const profile = useAppSelector(getFullProfile);
	const currentSpecialization = useAppSelector(getSpecializationId);
	const isSpecializationEmpty = useAppSelector(getIsEmptySpecialization);
	const [specialization, setSpecialization] = useState<number>(currentSpecialization);
	const [updateProfile] = useUpdateProfileMutation();

	const onStepComplete = () => {
		goNextStep?.();

		if (!specialization) return;

		updateProfile({
			...profile.activeProfile,
			user: { ...profile },
			profileSkills: [],
			specializationId: specialization,
		});
	};

	return (
		<LayoutStepComponent
			title={t(Onboarding.CHOOSE_SPECIALIZATION_TITLE)}
			description={t(Onboarding.CHOOSE_SPECIALIZATION_CONTENT)}
			buttonPrimaryClick={onStepComplete}
			buttonPrimaryText={t(Onboarding.CHOOSE_SPECIALIZATION_BUTTON)}
		>
			<div className={styles['select-container']}>
				<Text variant="body2" color="black-700">
					{t(Onboarding.CHOOSE_SPECIALIZATION_SELECT_LABEL)}
				</Text>
				<SpecializationSelect
					onChange={(value) => setSpecialization(Array.isArray(value) ? value[0] : value)}
					value={specialization}
					disabled={!isSpecializationEmpty}
				/>
			</div>
		</LayoutStepComponent>
	);
};
