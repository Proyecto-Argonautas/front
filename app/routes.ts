import { index, prefix, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  // "/" Ruta raíz
  index( "routes/home.tsx" ),

  // "/test" Ruta test
  route( "test", "routes/test.tsx" ),

  // "/anidado" si no se le pone index, esta ruta no ofrece nada
  ...prefix("anidado", [

    // "/anidado/test" al usar prefix ya estamos dentro de una "carpeta"
    route( "test", "routes/test2.tsx" )
  ])
] satisfies RouteConfig;
