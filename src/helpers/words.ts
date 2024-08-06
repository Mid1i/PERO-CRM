export const getWordByAmount = (amount: number, one: string, two: string, five: string): string => {
	const exceptionsCondition: boolean = amount === 11 || amount === 12 || amount === 13;

	const lastDigit: number = amount % 10;

	if (lastDigit === 1 && !exceptionsCondition) return `${amount} ${one}`;
	if ((lastDigit === 2 || lastDigit === 3 || lastDigit === 4) && !exceptionsCondition) return `${amount} ${two}`;

	return `${amount} ${five}`;
}

export const addLeadingZeros = (num: number): string => num.toString().padStart(2, "0");