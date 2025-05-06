import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/page.tsx", [
    index("routes/home.tsx"),
    route("bible/:version?/:book?/:chapter?/:verse?", "routes/bible.tsx"),
  ]),
] satisfies RouteConfig;