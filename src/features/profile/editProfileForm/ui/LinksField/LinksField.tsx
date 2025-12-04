import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Profile } from '@/shared/config';
import { FormField } from '@/shared/ui/FormField';

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
