import {
	index,
	prefix,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

// por defecto esta root "/"
export default [
	// * "/" Load index file in root route
	index("routes/home.tsx"),

	// * USER "user"
	...prefix("user", [
		// "/profile"
		route("profile", "routes/profile.tsx"),

		// "/
	]),

	// * Travel "/travel"
	...prefix("travel", [
		// "/travel/create"
		route("create", "routes/main-form.tsx"),

		// "/travel/:travelID" -> ...prefix(':travelID')"
		...prefix("1", [
			index("routes/travel.tsx"),
			// "/travel/{id}/pack-list"
			route("pack-list", "routes/pack-list.tsx"),

			// "/travel/{id}/tricount"
			// route("tricount", "routes/tricount.tsx")
		]),

	]),
] satisfies RouteConfig;
