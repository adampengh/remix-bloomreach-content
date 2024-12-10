import { useState } from "react";
import { BrComponent, BrPage } from "@bloomreach/react-sdk";
import { Page } from "@bloomreach/spa-sdk";
import axios from "axios";

export default function BrxApp({
  configuration,
  page,
  isPreview,
}: {
  configuration: any;
  page: Page;
  isPreview: boolean;
}) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);

  const mapping = {};

  return (
    <div>
      <div className="counter my-6">
        <h2>Counter</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={decrement}
        >
          -
        </button>
        <span className="p-1.5 px-4 border-2 border-gray-400 rounded-md min-w-16 inline-block text-center">
          {count}
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={increment}
        >
          +
        </button>
      </div>

      {/* Triggers a client side request on counter interaction */}
      <BrPage
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
      >
        {/* Does NOT trigger a client side request on counter interaction */}
        {/* <BrPage configuration={configuration} page={page} mapping={mapping}> */}
        <BrComponent path="top" />
        <BrComponent path="main" />
        <BrComponent path="bottom" />
      </BrPage>
    </div>
  );
}
