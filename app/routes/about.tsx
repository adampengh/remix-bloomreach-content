import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import BrxApp from "~/components/BrxApp";
import { Configuration, initialize, Page } from "@bloomreach/spa-sdk";
import { buildConfiguration, ConfigurationBuilder } from "~/lib/BrxConfiguration";

export const meta: MetaFunction = () => {
  return [
    { title: "About Us" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface LoaderProps {
  configuration: Configuration;
  page: Page;
}

export const loader = async () => {
  const configuration: ConfigurationBuilder = buildConfiguration('/about')
  const page: Page = await initialize({ ...configuration, httpClient: axios as any });
  const pageJson = page.toJSON();
  return { configuration, page: pageJson };
};

export default function Index() {
  const { configuration, page } = useLoaderData<LoaderProps>();
  console.log('configuration', configuration)
  console.log('page', page)

  return (
    <div className='flex flex-col'>
      <h1 className='text-6xl my-3'>About Us</h1>
      <BrxApp configuration={configuration} page={page} />
    </div>
  );
}

