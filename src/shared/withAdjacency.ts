export function withAdjacency<Args extends unknown[], R, L>(
	adjacencyList: L,
	fn: (list: L, ...args: Args) => R,
) {
	return (...args: Args): R => fn(adjacencyList, ...args);
}
