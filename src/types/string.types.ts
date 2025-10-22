export interface StringAnalysisProperties {
  length: number;
  is_palindrome: boolean;
  unique_characters: number;
  word_count: number;
  sha256_hash: string;
  character_frequency_map: Record<string, number>;
}

export interface StringRecord {
  id: string; // same as sha256_hash
  value: string;
  properties: StringAnalysisProperties;
  created_at: string;
}

export interface FilterQuery {
  is_palindrome?: boolean;
  min_length?: number;
  max_length?: number;
  word_count?: number;
  contains_character?: string;
}

export interface NaturalLanguageQueryResult {
  data: StringRecord[];
  count: number;
  interpreted_query: {
    original: string;
    parsed_filters: Partial<FilterQuery>;
  };
}
export interface PaginationOptions {
  page: number;
  limit: number;
}