import { Configuration } from '@bloomreach/spa-sdk';

export type BuildConfigurationOptions = {
  endpoint: string | (string | null)[];
  baseUrl: string;
};
export type ConfigurationBuilder = Omit<Configuration & Partial<BuildConfigurationOptions>, 'httpClient'>;

export const BRXM_PUBLIC_ENDPOINT = process.env.BRXM_PUBLIC_ENDPOINT ?? '';

export const buildConfiguration = (
  path: string,
  endpoint: string = BRXM_PUBLIC_ENDPOINT,
) => {
  const configuration: ConfigurationBuilder = {
    NBRMode: true,
    endpoint: endpoint,
    path: path,
    debug: true,
  }

  return configuration
}
