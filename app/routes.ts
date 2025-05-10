import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/page.tsx", [
    index("routes/home.tsx"),
    route("bible/:book?/:chapter?/:verse?", "routes/bible.tsx"),
  ]),
] satisfies RouteConfig;