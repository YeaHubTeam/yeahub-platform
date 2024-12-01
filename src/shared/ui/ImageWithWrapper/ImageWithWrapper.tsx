import EmptyStub from '@/shared/assets/icons/EmptyStub.svg';
import { useScreenSize } from '@/shared/hooks/useScreenSize';

import styles from './ImageWithWrapper.module.css';

interface ImageWithWrapperProps {
	className?: string;
	src?: string | null;
	alt?: string;
}

export const ImageWithWrapper = ({ className, src, alt = '' }: ImageWithWrapperProps) => {
	const { isDesktop } = useScreenSize();
	if (!src && !isDesktop) {
		return null;
	}

	return (
		<div className={`${styles.wrapper} ${className}`}>
			{src ? (
				<img className={styles.image} src={src} alt={alt} />
			) : (
				<EmptyStub className={styles.svg} />
			)}
		</div>
	);
};
