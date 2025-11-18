import { Outlet, useLoaderData, useOutletContext } from "react-router";
import { getPropertyData } from "~/utils/requests/properties";
import type { Property, Gems } from "~/utils/types/api";
import type { Route } from "./+types/PropertySidebarLayout";
import { getAllCityGemsInNeighborhoods } from "~/utils/requests/gems";

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

type ContextType = { gems: Gems[] | null }
export function useGems() {
  return useOutletContext<ContextType>()
}

export default function PropertySidebar({ loaderData }: Route.ComponentProps) {
  const [properties, gems] = loaderData;
  return (
    <div className="sidebar-layout-container">
      <div className="sidebar">
        <ul className="menu bg-base-200 min-h-full p-4">
          {properties.map(p => (
            <li key={`property-${p.id}`} className="py-1">
              <a href={`/properties/${p.slug}`}>{p.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <Outlet context={{gems} satisfies ContextType} />
    </div>
  );
}