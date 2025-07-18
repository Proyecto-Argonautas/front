import { Link } from "react-router";
import MenuBar from "~/components/bars/MenuBar";
import CreateButton from "~/components/buttonsComponents/CreateButton";
import ProfileButton from "~/components/buttonsComponents/ProfileButton";
import SearchButton from "~/components/buttonsComponents/SearchButton";
import DestinationCard from "../components/cards/DestinationCard";

export function LandingPage() {
	return (
		<div className="min-h-screen bg-gray-100">
			<main className="flex flex-col gap-5 items-center justify-center pt-6 sm:pt-4 pb-25 px-4 max-w-6xl mx-auto sm:gap-4 ">
				
				{/* Layout móvil: todo vertical */}
				<div className="flex flex-col gap-5 w-full sm:hidden">
					<h1 className="font-bold text-xl text-center">SEGUIR PLANIFICANDO</h1>
					
					<div className="w-full flex flex-col gap-4 items-center">
						<Link to="/travel/1/resume" style={{ cursor: "pointer" }}>
							<DestinationCard
								image="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
								title="Iceland"
								members={2}
								startDate="2024/08/01"
								endDate="2024/08/10"
							/>
						</Link>

						<Link to="/travel/1/resume" style={{ cursor: "pointer" }}>
							<DestinationCard
								image="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
								title="Iceland"
								members={2}
								startDate="2024/08/01"
								endDate="2024/08/10"
							/>
						</Link>
					</div>

					<h1 className="font-bold text-xl text-center">TUS PRÓXIMOS VIAJES</h1>

					<div className="flex flex-col gap-4 items-center w-full">
						<Link to="/travel/1/resume" style={{ cursor: "pointer" }}>
							<DestinationCard
								image="https://images.pexels.com/photos/2032332/pexels-photo-2032332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
								title="Austria"
								members={1}
								startDate="2024/07/01"
								endDate="2024/07/10"
							/>
						</Link>
						
						<Link to="/travel/1/resume" style={{ cursor: "pointer" }}>
							<DestinationCard
								image="https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
								title="Tokyo"
								members={3}
								startDate="2024/09/15"
								endDate="2024/09/25"
							/>
						</Link>

						<Link to="/travel/1/resume" style={{ cursor: "pointer" }}>
							<DestinationCard
								image="https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
								title="New York"
								members={2}
								startDate="2024/10/01"
								endDate="2024/10/14"
							/>
						</Link>

						<Link to="/travel/1/resume" style={{ cursor: "pointer" }}>
							<DestinationCard
								image="https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
								title="Paris"
								members={4}
								startDate="2024/11/01"
								endDate="2024/11/07"
							/>
						</Link>
					</div>
				</div>
				



				{/* //!ORDENADOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOORRRRRRR */}


				{/* Layout escritorio: dos columnas lado a lado */}
				<div className="hidden sm:flex sm:gap-20 sm:w-full sm:max-w-5xl">


					{/* Columna izquierda: SEGUIR PLANIFICANDO */}
					<div className="flex-1">
						<h1 className="font-bold text-xl text-center mb-1">SEGUIR PLANIFICANDO</h1>
						
						<div className="grid grid-cols-2 gap-5">
							<Link to="/travel/1/resume" style={{ cursor: "pointer" }}>
								<DestinationCard
									image="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
									title="Iceland"
									members={2}
									startDate="2024/08/01"
									endDate="2024/08/10"
								/>
							</Link>

							<Link to="/travel/1/resume" style={{ cursor: "pointer" }}>
								<DestinationCard
									image="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
									title="Iceland"
									members={2}
									startDate="2024/08/01"
									endDate="2024/08/10"
								/>
							</Link>
						</div>
					</div>

					{/* Columna derecha: TUS PRÓXIMOS VIAJES */}
					<div className="flex-1">
						<h1 className="font-bold text-xl text-center mb-2">TUS PRÓXIMOS VIAJES</h1>
						
						<div className="grid grid-cols-2 gap-5">
							<Link to="/travel/1/resume" style={{ cursor: "pointer" }}>
								<DestinationCard
									image="https://images.pexels.com/photos/2032332/pexels-photo-2032332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
									title="Austria"
									members={1}
									startDate="2024/07/01"
									endDate="2024/07/10"
								/>
							</Link>
							
							<Link to="/travel/1/resume" style={{ cursor: "pointer" }}>
								<DestinationCard
									image="https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
									title="Tokyo"
									members={3}
									startDate="2024/09/15"
									endDate="2024/09/25"
								/>
							</Link>

							<Link to="/travel/1/resume" style={{ cursor: "pointer" }}>
								<DestinationCard
									image="https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
									title="New York"
									members={2}
									startDate="2024/10/01"
									endDate="2024/10/14"
								/>
							</Link>

							<Link to="/travel/1/resume" style={{ cursor: "pointer" }}>
								<DestinationCard
									image="https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
									title="Paris"
									members={4}
									startDate="2024/11/01"
									endDate="2024/11/07"
								/>
							</Link>
							
							
						</div>
					</div>
				</div>

				<MenuBar>
					<SearchButton />
					<CreateButton />
					<ProfileButton />
				</MenuBar>
			</main>
		</div>
	);
}