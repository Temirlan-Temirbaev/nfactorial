/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Rick and Morty API
 * The Rick and Morty API documentation
 * OpenAPI spec version: 1.0
 */

export interface Episode {
  /** The ID of the episode */
  id: number;
  /** The name of the episode */
  name: string;
  /** The air date of the episode */
  air_date: string;
  /** The code of the episode (e.g. S01E01) */
  episode: string;
  /** List of characters who appeared in the episode */
  characters: string[];
  /** Link to the episode's own URL endpoint */
  url: string;
  /** Time at which the episode was created in the database */
  created: string;
}
