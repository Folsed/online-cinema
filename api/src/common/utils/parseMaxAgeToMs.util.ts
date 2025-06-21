export function parseMaxAgeToMsUtil(value: string): number {
    const regexp = /^(\d+)([smhd])$/i;
    const match = value.match(regexp);

    if (!match) {
        throw new Error(`Invalid expire format: "${value}". Expected format like "15m", "7d", etc.`);
    }

    const amount = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    const multipliers: Record<string, number> = {
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000
    };

    const factor = multipliers[unit];
    if (factor === undefined) {
        throw new Error(`Unsupported time unit in expire value: "${unit}"`);
    }

    return amount * factor;
}
