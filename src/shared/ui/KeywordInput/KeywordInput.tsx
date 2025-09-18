import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions, Translation } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Input } from '@/shared/ui/Input';
import { SimpleChip } from '@/shared/ui/SimpleChip';

import styles from './KeywordInput.module.css';

export interface KeywordInputProps {
	value: string[];
	onChange: (value: string[]) => void;
}

export const KeywordInput = ({ value = [], onChange }: KeywordInputProps) => {
	const [keywords, setKeywords] = useState('');
	const [keywordsArray, setKeywordsArray] = useState<string[]>(value);

	const { t } = useTranslation([i18Namespace.questions, i18Namespace.translation]);

	useEffect(() => {
		if (JSON.stringify(value) !== JSON.stringify(keywordsArray)) {
			setKeywordsArray(value);
		}
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
				/>
				<Button
					className={styles.button}
					onClick={handleClick}
					dataTestId="KeywordInput_Create_Button"
				>
					{t(Translation.CREATE, { ns: i18Namespace.translation })}
				</Button>
			</Flex>
			<Flex gap="16" direction="column">
				{keywordsArray?.length > 0 && (
					<>
						<h4>{t(Questions.KEYWORDS_TITLE)}</h4>
						<Flex
							direction="row"
							wrap="wrap"
							dataTestId="KeywordInput_Keywords"
							className={styles.keywords}
						>
							{keywordsArray.map((keyword) => {
								return (
									<SimpleChip
										dataTestIds={{
											simpleChip: 'KeywordInput_Keyword',
											simpleChipText: 'KeywordInput_Keyword_Text',
											simpleChipDeleteButton: 'KeywordInput_Keyword_Delete_Button',
										}}
										key={keyword}
										onDelete={() => {
											handleDeleteKeywords(keyword);
										}}
									>
										{keyword}
									</SimpleChip>
								);
							})}
						</Flex>
					</>
				)}
			</Flex>
		</Flex>
	);
};
