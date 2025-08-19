import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { FormField } from '@/shared/ui/FormField/FormField';

import { SocialNetWorkInputs } from '@/entities/socialNetwork';

export const LinksField = () => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<FormField
			isLimitWidth
			label={t(Profile.LINKS_TITLE)}
			description={t(Profile.LINKS_DESCRIPTION)}
		>
			<SocialNetWorkInputs />
		</FormField>
	);
};
