import { Routes, Route } from 'react-router-dom';

import Home from '@/features/home/pages';
import Contact from '@/features/contact/pages';
import Tournaments from '@/features/tournaments/pages';
import LoginPage from '@/features/login/pages';
import ProfilePage from '@/features/profile/pages';

import OrganizerLayout from '@/features/organizer/layout/OrganizerLayout';
import OrganizerDashboard from '@/features/organizer/pages/organizer';
import OrganizerTournaments from '@/features/organizer/pages/Tournaments';
import CreateTournament from '@/features/organizer/pages/create-tournament';
import OrganizerPlayers from '@/features/organizer/pages/players';
import OrganizerSettings from '@/features/organizer/pages/settings';
import TournamentDetails from '@/features/organizer/pages/TournamentDetails';
import EditTournament from '@/features/organizer/pages/EditTournament';

import PublicRoute from './public-route';
import ProtectedRoute from './protected-route';

const Router = () => (
  <Routes>
    {/* 🌍 Public */}
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/tournaments/*" element={<Tournaments />} />

    {/* 🔓 Login only */}
    <Route
      path="/login"
      element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      }
    />

    {/* 🔐 Protected User Routes */}
    <Route
      element={<ProtectedRoute allowedRoles={['USER', 'ORGANIZER', 'ADMIN']} />}
    >
      <Route path="/profile" element={<ProfilePage />} />
    </Route>

    {/* 🔐 Organizer */}
    <Route element={<ProtectedRoute allowedRoles={['ORGANIZER']} />}>
      <Route path="/organizer" element={<OrganizerLayout />}>
        <Route index element={<OrganizerDashboard />} />
        <Route path="tournaments" element={<OrganizerTournaments />} />
        <Route path="tournaments/create" element={<CreateTournament />} />
        <Route
          path="tournaments/:tournamentId"
          element={<TournamentDetails />}
        />
        <Route
          path="tournaments/:tournamentId/edit"
          element={<EditTournament />}
        />
        <Route path="players" element={<OrganizerPlayers />} />
        <Route path="settings" element={<OrganizerSettings />} />
      </Route>
    </Route>
  </Routes>
);

export default Router;
