import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';

import { useLazyGetTrialQuery } from '@/entities/subscription';

import styles from './TrialButton.module.css';

interface TrialButtonProps {
	className?: string;
}

export const TrialButton = ({ className }: TrialButtonProps) => {
	const { t } = useTranslation(i18Namespace.subscription);

	const [getTrial] = useLazyGetTrialQuery();

	const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		await getTrial('');
	};

	return (
		<Button
			size="large"
			variant="outline"
			className={classNames(styles.trial, className)}
			onClick={handleClick}
		>
			{t(Subscription.SUBSCRIPTION_TEST_DRIVE)}
		</Button>
	);
};
