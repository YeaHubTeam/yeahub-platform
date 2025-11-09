import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';

import { Guru, GurusItem } from '@/entities/guru';

type GurusCardProps = {
	guru: Guru;
};

const GurusCard = ({ guru }: GurusCardProps) => {
	const { t } = useTranslation(i18Namespace.landing);

	const { socials, description } = guru;

	return (
		<Card
			withOutsideShadow
			actionRoute={socials.landing || ''}
			actionTitle={t(Landing.GURU_LINK)}
			isActionPositionBottom
		>
			<GurusItem guru={guru} avatarSize={65} description={description} showSocials={false} />
		</Card>
	);
};

export default GurusCard;
