import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import api from '../services/api';

const Profile = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await api.get('/auth/me');

        setUser(res.data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchProfile();

  }, []);

  // LOADING
  if (!user) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa]">

        <div className="w-14 h-14 border-4 border-red-200 border-t-[#c94343] rounded-full animate-spin"></div>

      </div>
    );

  }

  return (

    <div className="min-h-screen bg-[#f5f6fa] p-6">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-[35px] overflow-hidden shadow-2xl border border-gray-100">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#c94343] to-[#9f2f2f] h-64 p-10 text-white relative overflow-hidden">

            <div className="absolute top-[-50px] right-[-50px] w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>

            <div className="relative z-10">

              <h1 className="text-5xl font-black">
                My Profile
              </h1>

              <p className="mt-4 text-white/80 text-lg">
                User information dashboard
              </p>

            </div>

          </div>

          {/* BODY */}
          <div className="p-8">

            {/* PROFILE */}
            <div className="-mt-24 flex flex-col md:flex-row md:items-end gap-6">

              {/* AVATAR */}
              <div className="w-44 h-44 rounded-full bg-gradient-to-r from-[#c94343] to-[#9f2f2f] border-[8px] border-white shadow-2xl flex items-center justify-center text-white text-6xl font-black">

                {user?.name?.charAt(0)}

              </div>

              {/* INFO */}
              <div className="pb-4">

                <h2 className="text-4xl font-bold text-gray-900">
                  {user?.name}
                </h2>

                <p className="text-gray-500 mt-2 text-lg">
                  {user?.email}
                </p>

                <div className="flex items-center gap-3 mt-4">

                  <span className="px-5 py-2 rounded-full bg-red-100 text-[#c94343] font-semibold capitalize">
                    {user?.role}
                  </span>

                  <span className="px-5 py-2 rounded-full bg-green-100 text-green-600 font-semibold">
                    Active
                  </span>

                </div>

              </div>

            </div>

            {/* INFO CARDS */}
            <div className="grid md:grid-cols-3 gap-6 mt-14">

              <Card
                title="Department"
                value={user?.department || 'Not Added'}
              />

              <Card
                title="Phone"
                value={user?.phone || 'Not Added'}
              />

              <Card
                title="Role"
                value={user?.role || 'Student'}
              />

            </div>

            {/* BIO */}
            <div className="mt-10 bg-gray-50 rounded-[30px] p-8 border border-gray-100">

              <h2 className="text-2xl font-bold text-gray-900">
                Bio
              </h2>

              <p className="text-gray-600 leading-8 mt-4">

                {user?.bio ||
                  'No bio added yet.'}

              </p>

            </div>

            {/* QR */}
            <div className="mt-10 bg-gray-50 rounded-[30px] p-10 border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-10">

              <div>

                <h2 className="text-3xl font-bold text-gray-900">
                  Profile QR
                </h2>

                <p className="text-gray-500 mt-4 max-w-lg">
                  Scan this QR code to access profile information.
                </p>

              </div>

              <div className="bg-white p-6 rounded-3xl shadow-xl">

                <QRCodeCanvas
                  value={JSON.stringify({
                    name: user?.name,
                    email: user?.email,
                    role: user?.role,
                  })}
                  size={220}
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

const Card = ({ title, value }) => (

  <div className="bg-white rounded-[30px] p-8 shadow-lg border border-gray-100">

    <p className="text-gray-500">
      {title}
    </p>

    <h2 className="text-3xl font-bold text-gray-900 mt-4 capitalize">
      {value}
    </h2>

  </div>

);

export default Profile;