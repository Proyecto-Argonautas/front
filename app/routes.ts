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
	index("routes/home.tsx"),

	// Agrupa rutas bajo el prefijo "/travel"
	...prefix("travel", [
		// Agrupa rutas bajo "/travel/1"
		...prefix("1", [
			// Define un layout para todas las rutas hijas bajo "/travel/1"
			layout("layouts/travelLayout.tsx", [
				// Ruta "/travel/1" muestra la descripción del viaje
				index("routes/travel-resume.tsx", {
					id: "travel-resume-index",
				}),

				// Ruta "/travel/1/resume": muestra la descripción del viaje
				route("resume", "routes/travel-resume.tsx", {
					id: "travel-resume-route",
				}),

				// Ruta "/travel/1/itinerary": muestra el itinerario del viaje
				route("itinerary", "routes/travel-itinerary.tsx"),

				// Ruta "/travel/1/tools": muestra las herramientas del viaje
				route("tools", "routes/travel-tools.tsx"),
			]),

			// Ruta "/travel/1/pack-list": muestra la lista de equipaje
			route("pack-list", "routes/pack-list.tsx"),
		]),

		// Ruta "/travel/create": formulario para crear un nuevo viaje
		route("create", "routes/main-form.tsx"),
	]),

	// Agrupa rutas bajo "/user"
	...prefix("user", [
		// Ruta "/user/profile": perfil de usuario
		route("profile", "routes/profile.tsx"),
		// Ruta "/user/login": inicio de sesión de usuario
		route("login", "routes/login.tsx"),

		// Ruta "/user/register": registro de usuario
		route("register", "routes/register.tsx"),
	]),
] satisfies RouteConfig;
