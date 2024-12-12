import { useState } from "react";
import { BrComponent, BrPage, BrPageContext } from "@bloomreach/react-sdk";
import { Configuration, Page, PageModel } from "@bloomreach/spa-sdk";
import { BrxMapping } from "~/lib/BrxMapping";
import axios from "axios";

export default function BrxApp({
  configuration,
  page,
  pageJson,
  isPreview,
}: {
  configuration: Configuration;
  page: Page;
  pageJson: PageModel;
  isPreview: boolean;
}) {

  // Check if we are running in a server or browser environment
  // If we are running in a browser environment, set the httpClient on the configuration object
  if (typeof window === "undefined") {
    // running in a server environment
    console.log('SERVER')
  } else {
    // running in a browser environment
    console.log('BROWSER')
    configuration.httpClient = axios;
    console.log('pageJson', pageJson)
  }

  const [count, setCount] = useState(0);
  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);

  return (
    <div>
      <div className="counter my-6">
        <h2>Counter</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={decrement}
        > - </button>
        <span className="p-1.5 px-4 border-2 border-gray-400 rounded-md min-w-16 inline-block text-center">
          {count}
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={increment}
        > + </button>
      </div>

      {/* Triggers a client side request on counter interaction */}
      {/* <BrPage
        // doing something with spreading will trigger a http client request by BrPage
        // even though we don't pass a httpClient key in the configuration object!
        // why/how does the send() method eventually get triggered?
        // this shouldn't happen, right?
        configuration={{
          ...configuration,
          ...(isPreview ? { httpClient: axios } : {}),
        }}
        page={page}
        mapping={mapping}
      > */}

        {/* Does NOT trigger a client side request on counter interaction */}

      <BrPage configuration={configuration} page={pageJson} mapping={BrxMapping}>
        <BrPageContext.Consumer>
          {(page) => page && (
            <div>
              <p>isPreview: {page.isPreview() ? 'true' : 'false'}</p>
              <p>Page Title: {page.getTitle()}</p>
            </div>
          )}
        </BrPageContext.Consumer>
        <BrComponent path="top" />
        <BrComponent path="main" />
        <BrComponent path="bottom" />
      </BrPage>
    </div>
  );
}
