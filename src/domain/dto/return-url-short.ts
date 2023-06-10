import { z } from 'zod';

export const ZReturnShortUrl = z.object({
  short_url: z.string().min(1).url('invalid short url'),
  original_url: z.string().url('invalid original url'),
});
export type TReturnShortUrl = z.infer<typeof ZReturnShortUrl>;
