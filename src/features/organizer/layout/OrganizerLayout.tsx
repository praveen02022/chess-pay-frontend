import { Outlet } from 'react-router-dom';
import OrganizerSidebar from '../components/OrganizerSidebar';

const OrganizerLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <OrganizerSidebar />

      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OrganizerLayout;
