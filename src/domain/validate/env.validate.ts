import { type } from 'os';
import { z } from 'zod';
export const ZValidateEnv = z.object({
  PORT: z.string().transform((t) => Number.parseInt(t)),
  BASE_URL: z.string().url('base url must be a valid url'),
});
export type TEnv = z.infer<typeof ZValidateEnv>;
export const validEnv = () => {
  return ZValidateEnv.parse(process.env);
};
