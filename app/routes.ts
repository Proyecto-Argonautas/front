import {
	index,
	prefix,
	route,
	type RouteConfig,
} from "@react-router/dev/routes";

// por defecto esta root "/"
export default [
	// "/" Load index file in root route
	index("routes/home.tsx"),

	// "/travel/create"
	route("travel/create", "routes/main-form.tsx"),

	// "/travel/{id}"
  // prefixPath: "travel/:travelID"
	...prefix("travel/1", [
		index("routes/travel.tsx"),
		// "/travel/{id}/pack-list"
		route("pack-list", "routes/pack-list.tsx"),
	]),
] satisfies RouteConfig;
