export const parseNaturalLanguageQuery = (query) => {
    const lower = query.toLowerCase();
    const parsed = {};
    if (lower.includes('palindromic'))
        parsed.is_palindrome = true;
    if (lower.includes('single word'))
        parsed.word_count = 1;
    if (lower.includes('longer than')) {
        const match = lower.match(/longer than (\d+)/);
        if (match)
            parsed.min_length = parseInt(match[1]) + 1;
    }
    if (lower.includes('containing the letter')) {
        const match = lower.match(/containing the letter (\w)/);
        if (match)
            parsed.contains_character = match[1];
    }
    if (Object.keys(parsed).length === 0)
        return { ok: false, error: 'Unable to parse natural language query' };
    return { ok: true, parsed_filters: parsed, original: query };
};
