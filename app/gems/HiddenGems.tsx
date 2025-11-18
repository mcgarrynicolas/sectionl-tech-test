import classNames from "classnames";
import { useReducer } from "react";
import { useLocation, useSearchParams } from "react-router";
import { QRCodeSVG } from "qrcode.react";

import { useGems } from "~/layouts/PropertySidebarLayout";
import type { Gems } from "~/utils/types/api";
import GemCard from "./components/GemCard";

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

enum SelectActionType {
  Select = "select", Reset = "reset"
}

interface selectAction {
  type: SelectActionType,
  payload: string;
}

function selectReducer(state: string[], action: selectAction): string[] {
  const { type, payload } = action;
  switch (type) {
    case SelectActionType.Select:
      if (state.includes(payload)) {
        return state.filter(s => s !== payload);
      }
      return [...state, payload];
    case SelectActionType.Reset:
      return [];
    default: return state;
  }
}

export function hydrateFallback() {
    return (
      <div className="sidebar-layout-container">
        <div className="sidebar">
          <ul className="menu bg-base-200 min-h-full p-4">
          </ul>
        </div>
        <div className="main-content">
          <ul className="menu bg-base-200 min-h-full p-4">
          </ul>
        </div>
        <div className="qr-code-bar">
          <ul className="menu bg-base-200 min-h-full p-4">
          </ul>
        </div>
      </div>
    );
  }

export default function HiddenGems() {
  const [searchParams, _] = useSearchParams();
  const location = useLocation();
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
  const isFilterSelected = (filter: string) => filterState.activeFilters.includes(filter);

  const getInitialSelected = () => {
    const searchSelected = searchParams.get("selected");
    const selectedSlugs = searchSelected
      ?.split(',') // separate by commas
      .map(slug => slug.trim()); // eliminate whitespace
    return selectedSlugs || [];
  };

  const [selectedState, selectedDispatch] = useReducer(selectReducer, getInitialSelected());
  const encodeSelection = () => {
    return `?selected=${encodeURIComponent(selectedState.join(','))}`;
  };

  const currentUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`;

  console.log(`${currentUrl}${encodeSelection()}`);


  return <>
    <div className="main-content p-4 py-4">
      <div className="p-4 py-4">
        <div className="grid grid-cols-3">
          {filterState.filteredGems.map((gem) => <GemCard key={gem.slug} {...gem} selected={selectedState.includes(gem.slug)} action={() => selectedDispatch({ type: SelectActionType.Select, payload: gem.slug })} />)}
        </div>
      </div>
    </div>
    <div className="qr-code-bar">
      {selectedState.length > 0 && <>
        <div className="text-bold text-2xl text-center">Save Your Faves</div>
        <div className="qr-code flex justify-center">
          <QRCodeSVG value={`${currentUrl}${encodeSelection()}`} />
        </div>
        <div className="text-gray-500 text-xs p-0.5">Scan this QR code to pull up this screen just how you left it!</div>
      </>}
      <div className="grid grid-cols-1">
        {selectedState.length > 0 &&
          <button className="bg-gray-600 text-white font-bold mb-2 text-m cursor-pointer rounded-2xl" onClick={() => selectedDispatch({ type: SelectActionType.Reset, payload: "" })}>
            Reset Selection
          </button>
        }
        {
          filterables &&
          filterables.map(
            filterable =>
              <button
                key={`filter__${filterable}`}
                className={
                  classNames(
                    "bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer",
                    isFilterSelected(filterable) && "selected bg-amber-400!",
                    `aria-selected: ${isFilterSelected(filterable)}`
                  )}
                onClick={() => filterDispatch({ type: FilterActionType.Filter, payload: filterable })}>
                {filterable}
              </button>
          )
        }
        <button className="bg-gray-600 text-white font-bold text-m cursor-pointer rounded-2xl" onClick={() => filterDispatch({ type: FilterActionType.Reset, payload: "" })}>
          Reset Filters
        </button>
      </div>
    </div>
  </>;
}