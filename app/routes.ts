import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("layouts/PropertySidebarLayout.tsx", [
    index("gems/index.tsx"),
    route("/properties/:properties", "gems/HiddenGems.tsx")
  ])


] satisfies RouteConfig;
