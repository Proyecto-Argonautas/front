import { Link } from "react-router";
import WonderPocket from "/images/WonderPocket.svg";

const MenuHeader = () => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-50">
        {/* Logo izquierda */}
        <Link
          className="w-16 h-16 flex items-center justify-center transition-transform duration-50 relative inset-0 bg-black/20 backdrop-blur-sm rounded-lg"
          to="/"
        >
          <img
            alt="Logo Argonautas"
            className="w-full h-full object-contain relative z-10 filter "
            src={WonderPocket}
          />
        </Link>
      </div>
    </>
  );
};

export default MenuHeader;

// const [isMenuOpen, setIsMenuOpen] = useState(false);

// const toggleMenu = () => {
//   setIsMenuOpen(!isMenuOpen);
// };

// const closeMenu = () => {
//   setIsMenuOpen(false);
// };

// {/* Menú hamburguesa derecha */}
// <button
//   aria-label="Menu"
//   className="w-16 h-16 flex items-center justify-center hover:scale-105 transition-transform p-2 relative"
//   onClick={toggleMenu}
// >
//   {/* Velo de fondo */}
//   <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg"></div>
//   {isMenuOpen ? (
//     <X className="w-6 h-6 text-white relative z-10" />
//   ) : (
//     <Menu className="w-6 h-6 text-white relative z-10" />
//   )}
// </button>

// {/* Overlay del menú desplegable */}
//       {isMenuOpen && (
//         <>
//           {/* Backdrop para cerrar el menú */}
//           <div className="fixed inset-0 bg-black/20 z-40" onClick={closeMenu} />

//           {/* Menú desplegable */}
//           <div className="fixed top-20 right-4 bg-white rounded-lg shadow-lg border border-gray-200 w-72 z-50 overflow-hidden">
//             {/* Header del perfil */}
//             <div className="p-4 border-b border-gray-100">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-lg font-semibold">A</span>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">¡Hola, Albert!</p>
//                   <p className="text-sm text-gray-600">
//                     albgonzalez98@gmail.com
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="py-2">
//               <Link
//                 className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
//                 onClick={closeMenu}
//                 to="/user/profile"
//               >
//                 <User className="w-5 h-5" />
//                 <span>Mi Perfil</span>
//               </Link>

//               <Link
//                 className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
//                 onClick={closeMenu}
//                 to="/settings"
//               >
//                 <Settings className="w-5 h-5" />
//                 <span>Configuración</span>
//               </Link>
//             </div>

//             {/* Botón cerrar sesión */}
//             <div className="p-4 border-t border-gray-100">
//               <button className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
//                 <LogOut className="w-5 h-5" />
//                 <span>Cerrar sesión</span>
//               </button>
//             </div>

//             {/* Footer con políticas */}
//             <div className="p-4 border-t border-gray-100 bg-gray-50">
//               <div className="flex justify-center space-x-4 text-xs text-gray-500">
//                 <a className="hover:text-gray-700" href="#">
//                   Política de Privacidad
//                 </a>
//                 <span>•</span>
//                 <a className="hover:text-gray-700" href="#">
//                   Términos del Servicio
//                 </a>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
