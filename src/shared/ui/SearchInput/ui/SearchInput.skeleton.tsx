import { InputSkeleton } from '@/shared/ui/Input';

import styles from './SearchInput.module.css';

export const SearchInputSkeleton = () => {
	return <InputSkeleton className={styles.input} />;
};
