import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Guru as GuruTranslation } from '@/shared/config/i18n/i18nTranslations';

import { Guru } from '../../model/types/guru';
import { GurusItem } from '../GurusItem/GurusItem';

import styles from './GurusList.module.css';

interface GurusListProps {
	variant: 'single' | 'list';
	gurus: Guru[];
}

export const GurusList = ({ variant, gurus }: GurusListProps) => {
	const { t } = useTranslation(i18Namespace.guru);

	return (
		<ul className={styles.list}>
			{gurus.map((guru, index) => (
				<GurusItem
					guru={guru}
					avatarSize={variant === 'single' ? 45 : 36}
					description={variant === 'single' ? t(GuruTranslation.BANNER_DESCRIPTION) : undefined}
					key={index}
				/>
			))}
		</ul>
	);
};
