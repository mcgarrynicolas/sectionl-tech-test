import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("layouts/PropertySidebarLayout.tsx", [
    index("hot-spots/index.tsx"),
    route(":property", "hot-spots/HotSpots.tsx")
  ])


] satisfies RouteConfig;
