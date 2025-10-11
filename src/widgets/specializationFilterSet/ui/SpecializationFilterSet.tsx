import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import PlusSvg from '@/shared/assets/icons/Plus1.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

import { UserSelect } from '@/entities/user';

import { useSpecializationFilter } from '../hooks/useSpecializationFilter';

import styles from './SpecializationFilterSet.module.css';

export type SpecializationFilterSetProps = {
	to?: string;
};

export const SpecializationFilterSet = ({ to }: SpecializationFilterSetProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const {
		filter: { authorId },
		handleFilterChange,
	} = useSpecializationFilter();

	const onChangeAuthor = (authorId: string | string[]) => {
		const value = Array.isArray(authorId) ? authorId[0] : authorId;
		handleFilterChange({ authorId: value });
	};

	return (
		<Card className={styles.card}>
			<section className={styles.section}>
				<UserSelect onChange={onChangeAuthor} value={authorId} hasMultiple={false} />
				{to && (
					<Button>
						<NavLink className={styles.link} to={to}>
							{t(Translation.CREATE)}
							<PlusSvg className={styles['plus-svg']} />
						</NavLink>
					</Button>
				)}
			</section>
		</Card>
	);
};
