import { Configuration } from '@bloomreach/spa-sdk';

export type BuildConfigurationOptions = {
  endpoint: string | (string | null)[];
  baseUrl: string;
};
export type ConfigurationBuilder = Omit<Configuration & Partial<BuildConfigurationOptions>, 'httpClient'>;

export const buildConfiguration = (
  path: string
) => {
  const configuration: ConfigurationBuilder = {
    NBRMode: true,
    endpoint: process.env.BRXM_PUBLIC_ENDPOINT ?? 'http://localhost:8080/site/resourceapi',
    path,
    // debug: true,
  }

  return configuration
}
