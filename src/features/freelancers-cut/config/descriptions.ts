import type { Description } from "@/features/freelancers-cut/types";

function replace(pattern: string, multipliers: number[], value: number) {
	let result = pattern;

	for (const multiplier of multipliers) {
		result = result.replace("{}", `${multiplier * value}`);
	}

	return result;
}

export function multiplicativeAbility(
	pattern: string,
	...multipliers: number[]
): Description {
	return (level) => replace(pattern, multipliers, level);
}

export function setAbility(array: string[]): Description {
	return (level) => array[Math.min(level, array.length - 1)];
}

export function description(data: string): Description {
	return (_) => data;
}
