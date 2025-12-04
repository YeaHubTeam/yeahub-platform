import classNames from 'classnames';
import { forwardRef } from 'react';

import { useCopy } from '@/shared/libs';

import { Icon } from '../Icon';
import { IconButton } from '../IconButton';

import styles from './CopyButton.module.css';
import { CopyButtonProps } from './types';

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
	({ text, ...props }, ref) => {
		const { copied, copy } = useCopy();

		return (
			<IconButton
				ref={ref}
				variant="tertiary"
				aria-label="copy"
				onClick={() => copy(String(text))}
				icon={<Icon icon={copied ? 'check' : 'copy'} size={20} />}
				className={classNames({ [styles.reset]: !copied })}
				{...props}
			/>
		);
	},
);

CopyButton.displayName = 'CopyButton';
