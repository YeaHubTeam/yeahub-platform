import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField/FormField';
import { Input } from '@/shared/ui/Input';

import { getIsEmptySpecialization } from '@/entities/profile';
import { SpecializationSelect } from '@/entities/specialization';

import { ProfileSchema } from '../../model/types/editProfileTypes';

export const PersonalInfoFields = () => {
	const { t } = useTranslation(i18Namespace.profile);
	const { control } = useFormContext<ProfileSchema>();
	const isSpecializationEmpty = useAppSelector(getIsEmptySpecialization);

	return (
		<FormField
			isLimitWidth
			label={t(Profile.PERSONAL_TITLE)}
			description={t(Profile.PERSONAL_DESCRIPTION)}
		>
			<Flex gap="20" direction="column">
				<FormControl name="username" control={control} label={t(Profile.FORM_USERNAME)}>
					{(field) => <Input {...field} size="S" />}
				</FormControl>
				<FormControl name="specialization" control={control} label={t(Profile.FORM_SPECIALIZATION)}>
					{({ onChange, value }) => (
						<SpecializationSelect
							onChange={onChange}
							value={[value]}
							disabled={!isSpecializationEmpty}
						/>
					)}
				</FormControl>
				<FormControl name="email" control={control} label={t(Profile.FORM_EMAIL)}>
					{(field) => <Input {...field} size="S" disabled />}
				</FormControl>
				<FormControl name="location" control={control} label={t(Profile.FORM_LOCATION)}>
					{(field) => <Input {...field} size="S" />}
				</FormControl>
			</Flex>
		</FormField>
	);
};
