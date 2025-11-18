import type { Route } from "./+types/HiddenGems";
import { useSearchParams } from "react-router";
import { useGems } from "~/layouts/PropertySidebarLayout";
import GemCard from "./components/GemCard";
import { useReducer } from "react";
import qs from "qs";
import type { Gems } from "~/utils/types/api";
interface filterState {

}

interface filterAction {
  type: string,
  payload: string;
}

function filterReducer(state: filterState, action: filterAction) {
  const { type, payload } = action;
  console.log(type, payload)
  switch (type) {
    default: return state;
  }
}

export default function HiddenGems() {
  const [searchParams, _] = useSearchParams();
  const { gems } = useGems();
  const tagsList = gems && gems.reduce((prev, curr) => {
    const { tags } = curr;
    tags.forEach(tag => {
      if (!prev.includes(tag.name)) {
        prev.push(tag.name);
      }
    });
    return prev;
  }, [] as string[]);

  const categoriesList = gems && gems.reduce((prev, curr) => {
    const { category } = curr;
    if (!prev.includes(category)) {
      prev.push(category);
    }
    return prev;
  }, [] as string[]);

  const filterables = tagsList && categoriesList && [...tagsList, ...categoriesList];

  const [filteredGems, filterDispatch] = useReducer(filterReducer, {});
  const isGemDefaultSelected = (gem: Gems) => {
    const currSelected = searchParams.get("selected");
    if (currSelected?.includes(gem.slug)) {
      return true;
    }
    return false;
  };


  return <>
    <div className="main-content p-4 py-4">
      <div className="p-4 py-4">
        <div className="grid grid-cols-3">
          {gems?.map((gem) => <GemCard key={gem.slug} {...gem} selected={isGemDefaultSelected(gem)} />)}
        </div>
      </div>
    </div>
    <div className="qr-code-bar">
      <div className="qr-code">QR Code Here</div>
      <div className="grid grid-cols-1">
        {
          filterables &&
          filterables.map(
            filterable =>
              <button
                className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                onClick={() => filterDispatch({ type: "filter", payload: filterable })}>
                {filterable}
              </button>
          )
        }
      </div>
    </div>
  </>;
}