import { FC, ReactNode, useCallback, useLayoutEffect, useRef, useState } from 'react';

import Arrow from '@/shared/assets/icons/arrow.svg';

import styles from './Block.module.css';

interface Props {
	children?: ReactNode;
	expandable?: boolean;
}

/**
 * Reusable block component
 * @param { string | ReactNode } children block content
 * @param { boolean } expandable if the flag is true then the block is expandable (an expand button appears)
 */

export const Block: FC<Props> = ({ children, expandable = false }) => {
	const blockRef = useRef<HTMLDivElement>(null);
	const [blockHeight, setBlockHeight] = useState(0);
	const [isExpand, setIsExpand] = useState(false);

	useLayoutEffect(() => {
		if (expandable) {
			const blockHeightHandler = () => {
				const height = (blockRef.current?.getClientRects()[0].height as number)!;

				setBlockHeight(isExpand ? height - 90 : height);
				if (height < 250 || (isExpand && height - 90 < 250)) {
					setIsExpand(false);
				}
			};

			window.addEventListener('resize', blockHeightHandler);
			return () => {
				window.removeEventListener('resize', blockHeightHandler);
			};
		}
	}, [expandable, isExpand]);

	useLayoutEffect(() => {
		if (expandable) {
			const height = (blockRef.current?.getClientRects()[0].height as number)!;
			setBlockHeight(height);
		}
	}, [expandable]);

	const expandHandler = useCallback(() => {
		setIsExpand((prev) => !prev);
	}, []);

	const isHeightForExpand = blockHeight >= 250;

	return (
		<div
			ref={blockRef}
			className={`${styles.block}
			${isHeightForExpand && expandable ? styles['block-expandable'] : ''} 
			${isExpand ? styles['block-expanded'] : ''}`}
		>
			{children}
			{expandable && isHeightForExpand && (
				<div className={styles['block-expand']}>
					<button onClick={expandHandler}>
						{!isExpand ? 'Развернуть' : 'Свернуть'}
						<Arrow className={`${isExpand ? styles['block-arrow-expanded'] : ''}`} />
					</button>
				</div>
			)}
		</div>
	);
};
