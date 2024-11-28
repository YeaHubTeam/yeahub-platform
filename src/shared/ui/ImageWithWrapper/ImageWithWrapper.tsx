import EmptyStub from '@/shared/assets/icons/EmptyStub.svg';

import styles from './ImageWithWrapper.module.css';

interface ImageWithWrapperProps {
	className?: string;
	src?: string | null;
	alt?: string;
	isMobile?: boolean;
	isTablet?: boolean;
}

export const ImageWithWrapper = ({
	className,
	src,
	alt = '',
	isMobile,
	isTablet,
}: ImageWithWrapperProps) => {
	if ((isMobile || isTablet) && !src) {
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
