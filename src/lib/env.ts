import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url().optional(),
});

export type AppEnv = z.infer<typeof envSchema>;

export function getValidatedEnv(): AppEnv {
  const parsed = envSchema.safeParse(import.meta.env);
  if (!parsed.success) {
    // In prototype we do not throw; log for visibility
    console.warn('Invalid environment variables:', parsed.error.flatten());
    return {} as AppEnv;
  }
  return parsed.data;
}
