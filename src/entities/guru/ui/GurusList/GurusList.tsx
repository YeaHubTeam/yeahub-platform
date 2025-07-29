import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Guru as GuruTranslation, Media } from '@/shared/config/i18n/i18nTranslations';

import { Guru } from '../../model/types/guru';
import { GurusItem } from '../GurusItem/GurusItem';

import styles from './GurusList.module.css';

interface GurusListProps {
	variant: 'single' | 'list' | 'list-with-borders';
	gurus: Guru[];
}

export const GurusList = ({ variant, gurus }: GurusListProps) => {
	const { t } = useTranslation(i18Namespace.guru);

	const avatarSize = variant === 'list-with-borders' ? 53 : variant === 'single' ? 45 : 36;

	const description =
		variant === 'single'
			? t(GuruTranslation.BANNER_DESCRIPTION)
			: variant === 'list-with-borders'
				? t(Media.GURU_DESCRIPTION, { ns: i18Namespace.media })
				: undefined;

	return (
		<ul className={variant === 'list-with-borders' ? styles['list-with-borders'] : styles['list']}>
			{gurus.map((guru, index) => (
				<GurusItem
					guru={guru}
					avatarSize={avatarSize}
					description={description}
					key={index}
					hasBorder={variant === 'list-with-borders'}
				/>
			))}
		</ul>
	);
};
