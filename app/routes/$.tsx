import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// Bloomreach SDK
import { initialize, Page } from "@bloomreach/spa-sdk";
import { buildConfiguration, ConfigurationBuilder } from "~/lib/BrxConfiguration";
import BrxApp from "~/components/BrxApp";
import axios from "axios";
import { LoaderProps } from "~/types";


export const meta: MetaFunction = () => {
  return [
    { title: "Homepage" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  console.log('url', url)
  const path = `${url.pathname}${url.search}`;
  console.log("path", path);

  const configuration: ConfigurationBuilder = buildConfiguration(path);
  const page: Page = await initialize({ ...configuration, httpClient: axios });
  const isPreview = page.isPreview();
  const pageJson = isPreview ? undefined : page.toJSON();

  return {
    configuration,
    page,
    pageJson,
    isPreview,
  };
};


export default function Index() {
  const { configuration, page, pageJson, isPreview } = useLoaderData<LoaderProps>();

  return (
    <div className="flex flex-col">
      <h1 className="text-6xl my-3">Dynamic Page</h1>
      <BrxApp
        configuration={configuration}
        page={page}
        pageJson={pageJson}
        isPreview={isPreview}
      />
    </div>
  );
}
