import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import PlusSvg from '@/shared/assets/icons/Plus1.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer/FiltersDrawer';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';

import styles from './SearchSection.module.css';

interface SearchSectionProps {
	to?: string;
	showRemoveButton?: boolean;
	onSearch?: (value: string) => void;
	searchValue?: string;
	renderRemoveButton?: () => React.ReactNode;
	renderFilter?: () => React.ReactNode;
}

export const SearchSection = ({
	to,
	onSearch,
	searchValue,
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
				{renderFilter && <FiltersDrawer>{renderFilter()}</FiltersDrawer>}
				<Input
					value={searchValue}
					onChange={handleSearch}
					className={styles.input}
					prefix={<Icon className={styles.search} icon="search" size={20} color="black-300" />}
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
