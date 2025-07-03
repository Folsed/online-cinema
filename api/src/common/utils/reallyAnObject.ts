export const reallyAnObject = (
    source: unknown,
    update?: Record<string, any>,
): Record<string, any> => {
    const base =
        typeof source === 'object' && source !== null ? (source as Record<string, any>) : {};
    return { ...base, ...(update ?? {}) };
};
