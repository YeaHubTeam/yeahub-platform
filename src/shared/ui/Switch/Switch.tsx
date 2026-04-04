import classnames from 'classnames';

import { Flex } from '@/shared/ui/Flex';

import { switchTestIds } from './constants';
import styles from './Switch.module.css';
import { SwitchProps } from './types';

export const Switch = ({
	checked,
	disabled = false,
	onChange,
	inputRef,
	inputProps = {},
	label,
	labelClassName,
	switchClassName,
	pinClassName,
	...otherProps
}: SwitchProps) => {
	return (
		<Flex dataTestId={switchTestIds.wrapper} align="center" {...otherProps}>
			<label
				data-testid={switchTestIds.switch}
				className={classnames(styles.switch, switchClassName)}
			>
				<input
					ref={inputRef}
					type="checkbox"
					checked={checked}
					disabled={disabled}
					className={styles['switch-input']}
					onChange={onChange}
					role="switch"
					aria-checked={checked}
					data-testid={switchTestIds.input}
					{...inputProps}
				/>
				<span
					data-testid={switchTestIds.pin}
					className={classnames(styles['switch-slider'], pinClassName)}
				/>
			</label>
			{label && (
				<span
					data-testid={switchTestIds.label}
					className={classnames(styles['switch-label'], labelClassName)}
				>
					{label}
				</span>
			)}
		</Flex>
	);
};
