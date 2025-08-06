import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Guru as GuruTranslation, Media } from '@/shared/config/i18n/i18nTranslations';

import { Guru } from '../../model/types/guru';
import { GurusItem } from '../GurusItem/GurusItem';

import styles from './GurusList.module.css';

type GuruListViewVariant = 'single' | 'list' | 'list-with-borders';
interface GurusListProps {
	variant: GuruListViewVariant;
	gurus: Guru[];
}

export const GurusList = ({ variant, gurus }: GurusListProps) => {
	const { t } = useTranslation(i18Namespace.guru);

	const avatarSize: Record<GuruListViewVariant, number> = {
		single: 45,
		list: 36,
		'list-with-borders': 53,
	};

	const description: Record<GuruListViewVariant, string> = {
		single: t(GuruTranslation.BANNER_DESCRIPTION),
		list: t(Media.GURU_DESCRIPTION, { ns: i18Namespace.media }),
		'list-with-borders': t(Media.GURU_DESCRIPTION, { ns: i18Namespace.media }),
	};

	return (
		<ul
			className={classNames(styles.list, {
				[styles['list-with-borders']]: variant === 'list-with-borders',
			})}
		>
			{gurus.map((guru, index) => (
				<GurusItem
					guru={guru}
					avatarSize={avatarSize[variant]}
					description={description[variant]}
					key={index}
					hasBorder={variant === 'list-with-borders'}
				/>
			))}
		</ul>
	);
};
