import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Questions, Translation } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Input } from '@/shared/ui/Input';

import { Chip } from '../Chip';
import { Text } from '../Text';

import styles from './KeywordInput.module.css';

export interface KeywordInputProps {
	value: string[];
	onChange: (value: string[]) => void;
	disabled?: boolean;
}

export const KeywordInput = ({ value = [], onChange, disabled }: KeywordInputProps) => {
	const [keywords, setKeywords] = useState('');
	const [keywordsArray, setKeywordsArray] = useState<string[]>(value);

	const { t } = useTranslation([i18Namespace.questions, i18Namespace.translation]);

	useEffect(() => {
		setKeywordsArray(value);
	}, [value]);

	const handleInput = () => {
		const enteredKeywords = keywords.toLocaleLowerCase().trim();
		if (enteredKeywords) {
			if (!keywordsArray.includes(enteredKeywords)) {
				const newKeywordsArray = [...keywordsArray, enteredKeywords];
				setKeywordsArray(newKeywordsArray);
				onChange(newKeywordsArray);
				setKeywords('');
			}
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleInput();
		}
	};

	const handleClick = () => {
		handleInput();
	};

	const handleDeleteKeywords = (selectedKeyword: string) => {
		const newKeywordsArray = keywordsArray.filter((keyword) => keyword != selectedKeyword);
		setKeywordsArray(newKeywordsArray);
		onChange(newKeywordsArray);
	};

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setKeywords(e.target.value);
	};

	return (
		<Flex gap="24" direction="column" dataTestId="KeywordInput">
			<Flex gap="8">
				<Input
					dataTestId="KeywordInput_Input"
					type="text"
					value={keywords}
					onChange={changeHandler}
					onKeyDown={handleKeyDown}
					disabled={disabled}
				/>
				<Button
					className={styles.button}
					onClick={handleClick}
					dataTestId="KeywordInput_Create_Button"
					disabled={disabled}
				>
					{t(Translation.CREATE, { ns: i18Namespace.translation })}
				</Button>
			</Flex>
			<Flex gap="16" direction="column">
				{!!keywordsArray.length && (
					<>
						<Text variant="body3-accent">{t(Questions.KEYWORDS_TITLE)}</Text>
						<Flex
							direction="row"
							wrap="wrap"
							dataTestId="KeywordInput_Keywords"
							className={styles.keywords}
						>
							{keywordsArray.map((keyword) => (
								<Chip
									key={keyword}
									label={keyword}
									theme="primary"
									onDelete={() => !disabled && handleDeleteKeywords(keyword)}
									disabled={disabled}
									active
									data-testid="keyword-chip"
								/>
							))}
						</Flex>
					</>
				)}
			</Flex>
		</Flex>
	);
};
