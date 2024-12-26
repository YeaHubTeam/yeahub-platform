import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import PlusSvg from '@/shared/assets/icons/Plus.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer/ui/FiltersDrawer';
import { Input } from '@/shared/ui/Input';

import styles from './SearchSection.module.css';

interface SearchSectionProps {
	to?: string;
	showRemoveButton?: boolean;
	onSearch?: (value: string) => void;
	renderRemoveButton?: () => React.ReactNode;
	renderFilter?: () => React.ReactNode;
}

export const SearchSection = ({
	to,
	onSearch,
	showRemoveButton,
	renderRemoveButton,
	renderFilter,
}: SearchSectionProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		onSearch?.(e.target.value);
	};

	return (
		<Card className={styles.card}>
			<section className={styles.section}>
				{!!renderFilter && <FiltersDrawer>{renderFilter()}</FiltersDrawer>}
				<Input
					onChange={handleSearch}
					className={styles.input}
					prefix={<Icon icon={'search'} className={styles['search-svg']} />}
					placeholder={t(Translation.SEARCH)}
				/>
				{showRemoveButton && renderRemoveButton && renderRemoveButton()}
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
