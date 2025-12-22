import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import styles from './UserEditButton.module.css';

interface UserEditButtonProps {
	tab: string;
}

export const UserEditButton = ({ tab }: UserEditButtonProps) => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate(`${ROUTES.profile.edit.page}#${tab}`);
	};

	return (
		<div className={styles['card-edit-block']}>
			<Button
				variant="link"
				fullWidth={true}
				className={styles['card-edit']}
				onClick={handleNavigate}
			>
				<Icon icon="pen" size={20} color="purple-700" />
			</Button>
		</div>
	);
};
