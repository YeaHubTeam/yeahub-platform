import { fireEvent, screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { KeywordInput, KeywordInputProps } from './KeywordInput';

type OverrideProps = Partial<KeywordInputProps>;

const render = (props: OverrideProps = {}) => {
	const defaultProps: KeywordInputProps = {
		value: [],
		onChange: () => {},
	};
	return renderComponent(<KeywordInput {...defaultProps} {...props} />);
};

describe('KeywordInput', () => {
	describe('render', () => {
		test('render without initial values', () => {
			render({ value: undefined });

			expect(screen.getByTestId('KeywordInput')).toBeInTheDocument();
			expect(screen.getByTestId('Input')).toBeInTheDocument();
			expect(screen.getByTestId('Button')).toBeInTheDocument();
			expect(screen.queryByTestId('Keywords-container')).not.toBeInTheDocument();
			expect(screen.queryByTestId('Simple-chip-text')).not.toBeInTheDocument();
		});
		test('render test with few keywoards', () => {
			render({ value: ['java', 'docker'] });

			const allChips = screen.getAllByTestId('Simple-chip-text');

			expect(screen.getByTestId('KeywordInput')).toBeInTheDocument();
			expect(screen.getByTestId('Input')).toBeInTheDocument();
			expect(screen.getByTestId('Button')).toBeInTheDocument();
			expect(screen.getByTestId('Keywords-container')).toBeInTheDocument();
			expect(allChips.length).toBe(2);
		});
	});
	describe('added new keywoard', () => {
		test('check input value and add button, with 0 start keywoard', () => {
			const handleChange = jest.fn();

			render({ onChange: handleChange });

			const input = screen.getByTestId('Input');
			const button = screen.getByTestId('Button');

			fireEvent.change(input, { target: { value: 'JavaScript' } });
			expect(input).toHaveValue('JavaScript');

			fireEvent.click(button);
			expect(input).toHaveValue('');

			const newChip = screen.getByTestId('Simple-chip-text');

			expect(newChip).toBeInTheDocument();
			expect(newChip).toHaveTextContent('javascript');
			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenCalledWith(['javascript']);
		});
		test('check input value and add button, with few start keywoard', () => {
			const handleChange = jest.fn();

			render({ value: ['java', 'docker'], onChange: handleChange });

			const input = screen.getByTestId('Input');
			const button = screen.getByTestId('Button');

			const allChips = screen.getAllByTestId('Simple-chip-text');
			expect(allChips.length).toBe(2);

			fireEvent.change(input, { target: { value: 'JS' } });
			expect(input).toHaveValue('JS');

			fireEvent.click(button);
			expect(input).toHaveValue('');

			const allChipsAfterAdded = screen.getAllByTestId('Simple-chip-text');
			expect(allChipsAfterAdded.length).toBe(3);

			const newChip = allChipsAfterAdded.find((chip) => chip.textContent === 'js');

			expect(newChip).toBeInTheDocument();
			expect(newChip).toHaveTextContent('js');
			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenCalledWith(['java', 'docker', 'js']);
		});
		test('check input value and add button, with empty input after trim', () => {
			const handleChange = jest.fn();

			render({ value: ['java', 'docker'], onChange: handleChange });

			const input = screen.getByTestId('Input');
			const button = screen.getByTestId('Button');

			const allChips = screen.getAllByTestId('Simple-chip-text');
			expect(allChips.length).toBe(2);

			fireEvent.change(input, { target: { value: '   ' } });
			expect(input).toHaveValue('   ');

			fireEvent.click(button);
			expect(input).toHaveValue('   ');

			const allChipsAfterAdded = screen.getAllByTestId('Simple-chip-text');
			expect(allChipsAfterAdded.length).toBe(2);

			const newChip = allChipsAfterAdded.find((chip) => chip.textContent === '');
			expect(newChip).toBeUndefined();

			expect(handleChange).toHaveBeenCalledTimes(0);
			expect(handleChange).not.toHaveBeenCalledWith(['java', 'docker']);
		});
		test('check input value and add button, with repeat keywoard', () => {
			const handleChange = jest.fn();

			render({ value: ['java', 'docker'], onChange: handleChange });

			const input = screen.getByTestId('Input');
			const button = screen.getByTestId('Button');

			const allChips = screen.getAllByTestId('Simple-chip-text');
			expect(allChips.length).toBe(2);

			const oldChip = allChips.find((chip) => chip.textContent === 'java');
			expect(oldChip).toBeInTheDocument();

			fireEvent.change(input, { target: { value: 'JaVa' } });
			expect(input).toHaveValue('JaVa');

			fireEvent.click(button);
			expect(input).toHaveValue('JaVa');

			const allChipsAfterAdded = screen.getAllByTestId('Simple-chip-text');
			expect(allChipsAfterAdded.length).toBe(2);

			expect(oldChip).toBeInTheDocument();
			expect(handleChange).toHaveBeenCalledTimes(0);
			expect(handleChange).not.toHaveBeenCalledWith(['java', 'docker']);
		});
		test('check input enter keydown', () => {
			const handleChange = jest.fn();

			render({ value: ['java', 'docker'], onChange: handleChange });

			const input = screen.getByTestId('Input');

			const allChips = screen.getAllByTestId('Simple-chip-text');
			expect(allChips.length).toBe(2);

			fireEvent.change(input, { target: { value: 'TS' } });
			expect(input).toHaveValue('TS');

			fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
			expect(input).toHaveValue('');

			const allChipsAfterAdded = screen.getAllByTestId('Simple-chip-text');
			expect(allChipsAfterAdded.length).toBe(3);

			const newChip = allChipsAfterAdded.find((chip) => chip.textContent === 'ts');
			expect(newChip).toBeInTheDocument();

			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenCalledWith(['java', 'docker', 'ts']);
		});
		test('should not call handleInput if key is not Enter', () => {
			const handleChange = jest.fn();
			const handleInput = jest.fn();

			render({ value: ['java', 'docker'], onChange: handleChange });

			const input = screen.getByTestId('Input');

			fireEvent.change(input, { target: { value: 'TS' } });
			expect(input).toHaveValue('TS');

			fireEvent.keyDown(input, { key: 'A', code: 'KeyA' });

			expect(handleInput).not.toHaveBeenCalled();
			expect(input).toHaveValue('TS');
		});
	});
	describe('delete keyword', () => {
		test('delete', () => {
			render({ value: ['java', 'docker'] });

			const allChips = screen.getAllByTestId('Simple-chip-text');
			expect(allChips.length).toBe(2);

			const chipWithJava = allChips.find((chip) => chip.textContent?.toLowerCase() === 'java');
			expect(chipWithJava).toBeInTheDocument();

			const deleteButton = chipWithJava?.nextElementSibling as HTMLElement;
			expect(deleteButton).toBeInTheDocument();
			expect(deleteButton).toHaveAttribute('data-testid', 'Simple-chip-delete-button');

			fireEvent.click(deleteButton!);

			const allChipsAfterDel = screen.getAllByTestId('Simple-chip-text');
			expect(allChipsAfterDel.length).toBe(1);

			const chipWithJavaAfterDel = allChipsAfterDel.find(
				(chip) => chip.textContent?.toLowerCase() === 'java',
			);
			expect(chipWithJavaAfterDel).toBeUndefined();
		});
	});
});
