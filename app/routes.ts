import {
  index,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  // "/" Ruta raíz
  index("routes/home.tsx")
] satisfies RouteConfig;
