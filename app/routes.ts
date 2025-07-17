import {
	index,
	layout,
	prefix,
	type RouteConfig,
	route,
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
		layout("layouts/travelLayout.tsx", [
			index("routes/travelDescription.tsx", { id: "travel-description-index" }),
			route("description", "routes/travelDescription.tsx", { id: "travel-description-route" }),
			route("itinerary", "routes/travelItinerary.tsx"),
			route("tools", "routes/travelTools.tsx"),
		]),

		// "/travel/{id}/pack-list"
		route("pack-list", "routes/pack-list.tsx"),

		// "/travel/{id}/tricount"
		// route("tricount", "routes/tricount.tsx")
	]),

	// "/profile"
	route("/user/profile", "routes/profile.tsx"),
	// "/user/login"
	route("/user/login", "routes/login.tsx"),
] satisfies RouteConfig;
