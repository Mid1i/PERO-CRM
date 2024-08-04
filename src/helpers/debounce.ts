type TypeProcedure = (...args: any[]) => void;


export const debounce = <F extends TypeProcedure>(func: F, timeout: number = 300): (...args: Parameters<F>) => void => {
	let timer: number;

	return (...args) => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			func.apply(null, args);
		}, timeout);
	}
}