import { Configuration, initialize, Page } from "@bloomreach/spa-sdk";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import BrxApp from "~/components/BrxApp";
import {
  buildConfiguration,
  ConfigurationBuilder,
} from "~/lib/BrxConfiguration";

export const meta: MetaFunction = () => {
  return [
    { title: "Homepage" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface LoaderProps {
  configuration: Configuration;
  page: Page;
  isPreview: boolean;
}

export const loader = async () => {
  const configuration: ConfigurationBuilder = buildConfiguration("/");
  const page: Page = await initialize({
    ...configuration,
    httpClient: axios as any,
  });
  const pageJson = page.toJSON();
  return { configuration, page: pageJson, isPreview: page.isPreview() };
};

export default function Index() {
  const { configuration, page, isPreview } = useLoaderData<LoaderProps>();

  return (
    <div className="flex flex-col">
      <h1 className="text-6xl my-3">Homepage</h1>
      <BrxApp configuration={configuration} isPreview={isPreview} page={page} />
    </div>
  );
}
