import { ChangeEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Icon } from 'yeahub-ui-kit';

import PlusSvg from '@/shared/assets/icons/Plus.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer/ui/FiltersDrawer';

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
	const { t } = useI18nHelpers(i18Namespace.translation);

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
					preffix={<Icon icon={'search'} className={styles['search-svg']} />}
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
