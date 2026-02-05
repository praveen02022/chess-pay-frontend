import useAuthStore from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useMe } from '@/hooks/useme';
import {
  User,
  LogOut,
  Phone,
  Mail,
  Shield,
  MapPin,
  Calendar,
  Award,
  Edit,
  Hash,
  Fingerprint,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  useMe(isAuthenticated);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const InfoItem = ({ icon: Icon, label, value, className }: any) => (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
        <Icon className="h-4 w-4" /> {label}
      </label>
      <p className="text-lg font-medium text-gray-900 break-words">
        {value || 'N/A'}
      </p>
    </div>
  );

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-800">No User Found</h2>
        <Button onClick={() => navigate('/login')} className="mt-4">
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 px-8 py-10 text-white relative">
          <div className="flex flex-col md:flex-row items-center gap-6 z-10 relative">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-md shadow-lg">
              <User className="h-16 w-16 text-white" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight">
                {user.firstname} {user.lastname}
              </h1>
              <p className="text-green-50 font-medium opacity-90 capitalize mt-1 text-lg flex items-center justify-center md:justify-start gap-2">
                <Shield className="h-4 w-4" /> {user.role} Account
              </p>
            </div>
            <div className="flex-grow"></div>
            <Button
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 border-none text-white shadow-none backdrop-blur-sm"
              onClick={() => alert('Edit Profile - Coming Soon!')}
            >
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        {/* Details Section */}
        <div className="p-8 space-y-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              Contact Information
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <InfoItem icon={Mail} label="Email Address" value={user.email} />
              <InfoItem
                icon={Phone}
                label="Mobile Number"
                value={user.mobile}
              />
              <InfoItem
                icon={Phone}
                label="Alt. Mobile"
                value={user.alt_mobile}
              />
            </div>
          </div>

          <Separator />

          {/* Personal Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
              Personal Details
            </h3>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <InfoItem icon={User} label="Gender" value={user.gender} />

              <InfoItem
                icon={Calendar}
                label="Date of Birth"
                value={
                  user.dob ? new Date(user.dob).toLocaleDateString() : null
                }
              />

              <InfoItem icon={MapPin} label="State" value={user.state_name} />
              <InfoItem
                icon={MapPin}
                label="District"
                value={user.district_name}
              />
              <InfoItem icon={MapPin} label="Taluk" value={user.taluk_name} />
            </div>
          </div>

          <Separator />

          {/* Chess Identity */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
              Chess Identity
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <InfoItem
                icon={Fingerprint}
                label="FIDE ID"
                value={user.fide_id}
              />
              <InfoItem icon={Award} label="FIDE Rating" value={user.rating} />
              <InfoItem icon={Hash} label="TNSCA ID" value={user.tnsca_id} />
              <InfoItem icon={Hash} label="AICF ID" value={user.aicf_id} />
            </div>
          </div>

          <Separator className="my-6" />

          {/* Actions */}
          <div className="flex justify-end">
            <Button
              variant="destructive"
              size="lg"
              onClick={handleLogout}
              className="group shadow-md hover:shadow-lg transition-all"
            >
              <LogOut className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
