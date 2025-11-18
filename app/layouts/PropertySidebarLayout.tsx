import classNames from "classnames";
import { Outlet, useLocation, useOutletContext } from "react-router";
import type { Route } from "./+types/PropertySidebarLayout";

import type { Property, Gems } from "~/utils/types/api";
import { getAllCityGemsInNeighborhoods } from "~/utils/requests/gems";
import { getPropertyData } from "~/utils/requests/properties";

export async function clientLoader({ params }: Route.LoaderArgs): Promise<[Property[], Gems[] | null]> {
  const propertyData = await getPropertyData();
  if (params.properties) {
    const property = propertyData.find(p => p.slug === params.properties);
    if (property) {
      const cityGemData = await getAllCityGemsInNeighborhoods(property.neighborhoods.map(nb => nb.id));
      return [propertyData, cityGemData];
    }
  }
  return [propertyData, null];
}

type ContextType = { gems: Gems[] | null; };
export function useGems() {
  return useOutletContext<ContextType>();
}

export default function PropertySidebar({ loaderData }: Route.ComponentProps) {
  const [properties, gems] = loaderData;
  const location = useLocation();
  return (
    <div className="sidebar-layout-container">
      <div className="sidebar">
        <ul className="menu bg-base-200 min-h-full p-4 m-2">
          <li className="p-1 justify-center bg-amber-400 text-gray-600 font-bold text-m rounded-xl hover:bg-gray-600 hover:text-amber-400"><a href="/">Home</a></li>
          {properties.map(p => (
            <li key={`property-${p.id}`} className={classNames("p-1 justify-center bg-amber-400 text-gray-600 font-bold text-m rounded-xl hover:bg-gray-600 hover:text-amber-400",
              location.pathname.search(p.slug) > -1 && "bg-gray-600! text-amber-400! hover:bg-amber-400! hover:text-gray-600!"
            )}>
              <a href={`/properties/${p.slug}`}>{p.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <Outlet context={{ gems } satisfies ContextType} />
    </div>
  );
}