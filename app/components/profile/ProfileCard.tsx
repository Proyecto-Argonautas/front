import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { authClient } from "~/utils/auth-client"; // Assuming authClient has a deleteUser method

interface ProfileCardProps {
  name: string;
  email: string;
  profileImageUrl: string;
  // viajesCount: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  email,
  profileImageUrl,
  // viajesCount,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("La sesión ha sido cerrada correctamente");
          navigate("/user/login"); // redirige tras cerrar sesión
        },
      },
    });
  }

  // Assuming authClient has a deleteUser method
  async function handleDeleteUser() {
    await authClient.deleteUser({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Cuenta eliminada correctamente");
          navigate("/user/login"); // redirige tras eliminar la cuenta de usuario
        },
      },
    });
  }

  return (
    <div className="bg-cold-light-200 h-full flex flex-col items-center">
      <div>
        <img
          alt="logo WonderPocket"
          className="w-40 h-40"
          src="/images/WonderPocket.svg"
        />
      </div>
      <div className="relative w-full md:w-96 md:max-w-md bg-light-secondary-50 rounded-t-3xl md:rounded-3xl pt-20 md:pt-8 flex flex-col items-center shadow-md md:shadow-lg">
        {/* Imagen de perfil */}
        <div className="absolute -top-16 md:static md:mb-4">
          <div className="relative">
            <img
              alt="profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover"
              src={profileImageUrl}
            />
            <div className="absolute bottom-0 right-0 bg-light-primary rounded-full p-1 shadow-md">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <title>Edit profile</title>
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM6 12v2h2l7.293-7.293-2-2L6 12z" />
                <path
                  clipRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4a1 1 0 112 0v4a4 4 0 01-4 4H4a4 4 0 01-4-4V6a4 4 0 014-4h4a1 1 0 110 2H4z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Información */}
        <div className="mt-4 md:mt-0 text-center">
          <h1 className="text-lg md:text-xl font-bold text-gray-800">{name}</h1>
          <p className="text-gray-500 text-sm md:text-base">e{email}</p>
        </div>

        {/* Estadísticas */}
        {/* <div className="mt-4 md:mt-6 mb-0 md:mb-6 text-center"> */}
          {/* <p className="text-xl md:text-2xl font-bold text-gray-800">
            {viajesCount}
          </p> */}
          {/* <p className="text-sm md:text-base font-medium text-gray-600">
            TUS VIAJES
          </p> */}
        {/* </div> */}

        <div className="flex items-center">
          <button
            className="text-center w-full p-2 m-2 bg-cold-light-400 text-black font-medium rounded-md hover:bg-cold-light-200 transition"
            onClick={handleSignOut}
            type="button"
          >
            Cerrar sessión
          </button>
        </div>
        <div className="flex items-center">
          <button
            className="text-center w-full p-2 m-2 bg-red-700 text-white font-medium rounded-md hover:bg-red-400 hover:text-black transition"
            onClick={() => setShowModal(true)}
            type="button"
          >
            ⚠️ BORRAR CUENTA ⚠️
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm">
            <p className="text-center mb-4">
              ¿Estás seguro de que quieres borrar tu cuenta? Esta acción es
              irreversible.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDeleteUser}
              >
                ⚠️ Confirmar ⚠️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
