import { z } from 'zod';
export const ZCreateShortUrl = z.object({
  url: z.string().min(1).url('invalid url'),
});
export type TCreateShortUrl = z.infer<typeof ZCreateShortUrl>;
