import { getCityGemsNearNeighborhoods } from "~/utils/requests/gems";
import type { Route } from "./+types/HiddenGems";
import { useOutletContext, useSearchParams } from "react-router";

export async function clientLoader({ params, context }: Route.LoaderArgs) {
  // const { properties } = params;

  // const { data } = await getCityGemsNearNeighborhoods()
  return null;
}

export default function HiddenGems() {
  const [searchParams, _] = useSearchParams();
  
  return <></>
}