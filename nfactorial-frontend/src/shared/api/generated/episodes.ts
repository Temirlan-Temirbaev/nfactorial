/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Rick and Morty API
 * The Rick and Morty API documentation
 * OpenAPI spec version: 1.0
 */
import useSwr from 'swr';
import type {
  Key,
  SWRConfiguration
} from 'swr';

import type {
  EpisodeControllerGetAll200,
  EpisodeControllerGetAllParams,
  EpisodeControllerGetEpisode200
} from './model';

import { apiInstance } from '../instance';



  
  
  
/**
 * Retrieve episodes with optional filtering
 * @summary Get all episodes
 */
export const episodeControllerGetAll = (
    params?: EpisodeControllerGetAllParams,
 ) => {
    return apiInstance<EpisodeControllerGetAll200>(
    {url: `/episode`, method: 'GET',
        params
    },
    );
  }



export const getEpisodeControllerGetAllKey = (params?: EpisodeControllerGetAllParams,) => [`/episode`, ...(params ? [params]: [])] as const;

export type EpisodeControllerGetAllQueryResult = NonNullable<Awaited<ReturnType<typeof episodeControllerGetAll>>>
export type EpisodeControllerGetAllQueryError = void

/**
 * @summary Get all episodes
 */
export const useEpisodeControllerGetAll = <TError = void>(
  params?: EpisodeControllerGetAllParams, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof episodeControllerGetAll>>, TError> & { swrKey?: Key, enabled?: boolean },  }
) => {
  const {swr: swrOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getEpisodeControllerGetAllKey(params) : null);
  const swrFn = () => episodeControllerGetAll(params)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}
/**
 * Retrieve a single episode by ID or multiple episodes with comma-separated IDs (e.g., "1,2,3")
 * @summary Get episode by ID
 */
export const episodeControllerGetEpisode = (
    id: string,
 ) => {
    return apiInstance<EpisodeControllerGetEpisode200>(
    {url: `/episode/${id}`, method: 'GET'
    },
    );
  }



export const getEpisodeControllerGetEpisodeKey = (id: string,) => [`/episode/${id}`] as const;

export type EpisodeControllerGetEpisodeQueryResult = NonNullable<Awaited<ReturnType<typeof episodeControllerGetEpisode>>>
export type EpisodeControllerGetEpisodeQueryError = void

/**
 * @summary Get episode by ID
 */
export const useEpisodeControllerGetEpisode = <TError = void>(
  id: string, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof episodeControllerGetEpisode>>, TError> & { swrKey?: Key, enabled?: boolean },  }
) => {
  const {swr: swrOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(id)
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getEpisodeControllerGetEpisodeKey(id) : null);
  const swrFn = () => episodeControllerGetEpisode(id)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}
