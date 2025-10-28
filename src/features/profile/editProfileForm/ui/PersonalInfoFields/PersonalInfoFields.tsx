import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
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
	const navigate = useNavigate();

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	};

	return (
		<FormField
			isLimitWidth
			label={t(Profile.PERSONAL_TITLE)}
			description={t(Profile.PERSONAL_DESCRIPTION)}
		>
			<Flex gap="20" direction="column">
				<FormControl name="username" control={control} label={t(Profile.FORM_USERNAME)}>
					{(field) => <Input {...field} size="S" onKeyDown={handleKeyDown} />}
				</FormControl>
				<FormControl name="specialization" control={control} label={t(Profile.FORM_SPECIALIZATION)}>
					{({ onChange, value }) => (
						<>
							<SpecializationSelect
								onChange={onChange}
								value={[value]}
								disabled={!isSpecializationEmpty}
								onKeyDown={handleKeyDown}
							/>
							<Flex justify="start">
								<Button
									size="large"
									variant="link"
									onClick={() => navigate(ROUTES.settings.page + '#account')}
								>
									{t(Profile.FORM_SWITCH_SPECIALIZATION)}
								</Button>
							</Flex>
						</>
					)}
				</FormControl>
				<FormControl name="email" control={control} label={t(Profile.FORM_EMAIL)}>
					{(field) => <Input {...field} size="S" disabled onKeyDown={handleKeyDown} />}
				</FormControl>
				<FormControl name="location" control={control} label={t(Profile.FORM_LOCATION)}>
					{(field) => <Input {...field} size="S" onKeyDown={handleKeyDown} />}
				</FormControl>
			</Flex>
		</FormField>
	);
};
