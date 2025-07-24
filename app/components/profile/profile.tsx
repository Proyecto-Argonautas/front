import React from "react";

interface ProfileProps {
  name: string;
  email: string;
  avatarUrl: string;
  bio?: string;
}

const Profile: React.FC<ProfileProps> = ({ name, email, avatarUrl, bio }) => {
  return (
    <div className="max-w-sm bg-emerald-200 rounded-xl shadow-md overflow-hidden p-6">
      <div className="flex items-center space-x-4">
        <img
          alt={`${name}'s avatar`}
          className="w-16 h-16 rounded-full object-cover"
          src={avatarUrl}
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
      {bio && (
        <div className="mt-4">
          <p className="text-gray-700 text-sm">{bio}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
