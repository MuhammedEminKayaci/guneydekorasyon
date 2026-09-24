import type { APIRoute } from 'astro';
import { getCatalogData } from '../lib/search-index';

export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await getCatalogData()), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
