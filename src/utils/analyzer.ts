export const analyzeString = async (value: string) => {
  const length = value.length;
  const normalized = value.toLowerCase().replace(/\s+/g, '');
  const is_palindrome = normalized === normalized.split('').reverse().join('');
  const unique_characters = new Set(value).size;
  const word_count = value.trim().split(/\s+/).length;
  const character_frequency_map: Record<string, number> = {};

  for (const char of value) {
    character_frequency_map[char] = (character_frequency_map[char] || 0) + 1;
  }

  const crypto = await import('crypto');
  const sha256_hash = crypto.createHash('sha256').update(value, 'utf8').digest('hex');

  return { length, is_palindrome, unique_characters, word_count, sha256_hash, character_frequency_map };
};
