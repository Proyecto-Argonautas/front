

interface ProfileCardProps {
  name: string;
  username: string;
  profileImageUrl: string;
  viajesCount: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  username,
  profileImageUrl,
  viajesCount,
}) => {
  return (
    <div className="bg-emerald-200 min-h-screen flex pt-30 justify-center md:justify-center md:items-start md:pt-8">
      <div className="relative w-full md:w-96 md:max-w-md bg-gray-50 rounded-t-3xl md:rounded-3xl pt-20 md:pt-8 flex flex-col items-center shadow-md md:shadow-lg">
        
        {/* Imagen de perfil */}
        <div className="absolute -top-16 md:static md:mb-4">
          <div className="relative">
            <img
              src={profileImageUrl}
              alt="profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <title>Edit profile</title>
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM6 12v2h2l7.293-7.293-2-2L6 12z" />
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4a1 1 0 112 0v4a4 4 0 01-4 4H4a4 4 0 01-4-4V6a4 4 0 014-4h4a1 1 0 110 2H4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Información */}
        <div className="mt-4 md:mt-0 text-center">
          <h1 className="text-lg md:text-xl font-bold text-gray-800">{name}</h1>
          <p className="text-gray-500 text-sm md:text-base">@{username}</p>
        </div>

        {/* Estadísticas */}
        <div className="mt-4 md:mt-6 mb-0 md:mb-6 text-center">
          <p className="text-xl md:text-2xl font-bold text-gray-800">{viajesCount}</p>
          <p className="text-sm md:text-base font-medium text-gray-600">TUS VIAJES</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
