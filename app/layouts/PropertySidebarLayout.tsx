import { Outlet, useLoaderData } from "react-router";
import { getPropertyData } from "~/utils/requests/properties";
import type { Property, Gems } from "~/utils/types/api";
import type { Route } from "./+types/PropertySidebarLayout";
import { getCityGemsNearNeighborhoods } from "~/utils/requests/gems";

export async function clientLoader({ params }: Route.LoaderArgs): Promise<[Property[], Gems[] | null]> {
  const propertyData = await getPropertyData();
  if (params.properties) {
    const property = propertyData.find(p => p.id === Number(params.properties))
    if (property) {
      const cityGemData = await getCityGemsNearNeighborhoods(property.neighborhoods.map(nb => nb.id))
      return [propertyData, cityGemData]
    }
  }
  return [propertyData, null]
}

export default function PropertySidebar({ loaderData }: Route.ComponentProps) {
  const [properties, gems] = loaderData
  return (
    <div className="grid grid-cols-3 min-w-3/4 self-center">
      <div className="list">
        <ul>
          {
            properties.map((p) => (<div key={p.slug}><a href={`/properties/${p.id}`}>{p.name}</a></div>))
          }
        </ul>
      </div>
      <Outlet context={{properties, gems}} />
    </div>
  );
}