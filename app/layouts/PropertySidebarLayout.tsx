import { Outlet, useLoaderData } from "react-router";
import { getPropertyData } from "~/utils/requests/properties";
import type { Property } from "~/utils/types/api";

export async function clientLoader() {
  return await getPropertyData();
}

export default function PropertySidebar() {
  const properties = useLoaderData<Property[]>();

  return (
    <div className="grid grid-cols-3 min-w-3/4 self-center">
      <div className="list">
        <ul>
          {
            properties.map((p) => (<div key={p.slug}><a href={`/properties/${p.slug}`} target="_blank">{p.name}</a></div>))
          }
        </ul>
      </div>
      <Outlet />
    </div>
  );
}