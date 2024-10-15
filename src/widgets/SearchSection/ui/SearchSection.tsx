import { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Input, Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { TranslationsAdmin } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';

import styles from './SearchSection.module.css';

interface SearchSectionProps {
	to?: string;
	onRemove?: () => void;
	showRemoveButton?: boolean;
	onSearch?: (value: string) => void;
}

export const SearchSection = ({
	to = '/',
	onRemove,
	showRemoveButton,
	onSearch,
}: SearchSectionProps) => {
	const [value] = useState('');

	const { t } = useI18nHelpers(i18Namespace.translationsAdmin);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		onSearch?.(e.target.value);
	};

	return (
		<Card>
			<section className={styles.section}>
				<Input
					onChange={handleSearch}
					className={styles.input}
					preffix={<Icon icon={'search'} values={value} />}
				/>
				{showRemoveButton && (
					<Button onClick={onRemove} theme="destructive-tertiary">
						{t(TranslationsAdmin.REMOVE_SELECTED)}
					</Button>
				)}
				<Button size="small" textClassName={styles.navigate}>
					<NavLink className={styles.link} to={to}>
						{t(TranslationsAdmin.CREATE)}
					</NavLink>
				</Button>
			</section>
		</Card>
	);
};
