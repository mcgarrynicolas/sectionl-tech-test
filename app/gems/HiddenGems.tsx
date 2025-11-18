import type { Route } from "./+types/HiddenGems";
import { useSearchParams } from "react-router";
import { useGems } from "~/layouts/PropertySidebarLayout";
import GemCard from "./components/GemCard";
import { useReducer } from "react";
import qs from "qs";
import type { Gems } from "~/utils/types/api";

export enum FilterActionType {
  Filter = "filter", Reset = "reset"
}

interface filterAction {
  type: FilterActionType,
  payload: string;
}

type filterState = {
  activeFilters: string[],
  gems: Gems[],
  filteredGems: Gems[];
};

function filterReducer(state: filterState, action: filterAction): filterState {
  const { type, payload } = action;
  switch (type) {
    case FilterActionType.Filter:
      let newFilters = [];
      if (state.activeFilters.includes(payload)) {
        newFilters = state.activeFilters.filter((f) => f !== payload);
      } else {
        newFilters = [...state.activeFilters, payload];
      }

      let filteredGems = state.gems;
      if (newFilters.length) {
        filteredGems = state.gems.filter((gem) => {
          return gem.tags.some(tag => newFilters.includes(tag.name));
        });
      }

      return {
        activeFilters: newFilters,
        filteredGems,
        gems: state.gems
      };
    case FilterActionType.Reset:
      return { activeFilters: [], gems: state.gems, filteredGems: state.gems };
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

  const [filterState, filterDispatch] = useReducer(filterReducer, { activeFilters: [], gems: gems || [], filteredGems: gems || [] });
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
          {filterState.filteredGems.map((gem) => <GemCard key={gem.slug} {...gem} selected={isGemDefaultSelected(gem)} />)}
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
                onClick={() => filterDispatch({ type: FilterActionType.Filter, payload: filterable })}>
                {filterable}
              </button>
          )
        }
      </div>
    </div>
  </>;
}