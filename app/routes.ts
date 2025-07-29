import {
  index,
  layout,
  prefix,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

// por defecto esta root "/"
export default [
  // Ruta principal: carga el componente de inicio en "/"
  index("pages/landingPage.tsx"),

  // Agrupa rutas bajo el prefijo "/travel"
  ...prefix("travel", [
    // Agrupa rutas bajo "/travel/1"
    ...prefix("1", [
      // Define un layout para todas las rutas hijas bajo "/travel/1"
      layout("layouts/travelLayout.tsx", [
        // Ruta "/travel/1" muestra la descripción del viaje
        index("pages/travel/resumePage.tsx", {
          id: "travel-resume-index",
        }),

        // Ruta "/travel/1/resume": muestra la descripción del viaje
        route("resume", "pages/travel/resumePage.tsx", {
          id: "travel-resume-route",
        }),

        // Ruta "/travel/1/itinerary": muestra el itinerario del viaje
        route("itinerary", "pages/travel/itineraryPage.tsx"),

        // Ruta "/travel/1/tools": muestra las herramientas del viaje
        route("tools", "pages/travel/toolsPage.tsx"),

        // Ruta "/travel/1/budget": muestra el presupuesto del viaje
        route("budget", "pages/travel/budgetPage.tsx"),
      ]),
    ]),

    // Ruta "/travel/create": formulario para crear un nuevo viaje
    route("create", "pages/travel/mainFormPage.tsx"),
  ]),

  // Agrupa rutas bajo "/user"
  ...prefix("user", [
    // Ruta "/user/profile": perfil de usuario
    route("profile", "pages/user/profilePage.tsx"),
    // Ruta "/user/login": inicio de sesión de usuario
    route("login", "pages/user/loginPage.tsx"),

    // Ruta "/user/register": registro de usuario
    route("register", "pages/user/registerPage.tsx"),
  ]),
] satisfies RouteConfig;
