import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Trophy, Calendar, CheckCircle, PlusCircle } from 'lucide-react';

import { useMyTournaments } from '@/hooks/useTournament';

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const { data: tournaments = [], isLoading } = useMyTournaments();

  if (isLoading) {
    return <p className="text-muted-foreground">Loading dashboard…</p>;
  }

  const now = new Date();

  const upcoming = tournaments.filter((t) => new Date(t.start_date) > now);

  const completed = tournaments.filter((t) => new Date(t.end_date) < now);

  const nextTournament = upcoming.sort(
    (a, b) =>
      new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  )[0];

  const recentTournaments = [...tournaments]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  const hasTournaments = tournaments.length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Organizer Dashboard</h1>

        <div className="flex gap-2">
          <Button
            className="flex items-center"
            onClick={() => navigate('/organizer/tournaments/create')}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Tournament
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate('/organizer/tournaments')}
          >
            My Tournaments
          </Button>
        </div>
      </div>

      {/* Empty State */}
      {!hasTournaments && (
        <Card className="text-center py-12">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">No tournaments yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first chess tournament to get started.
            </p>
            <Button onClick={() => navigate('/organizer/tournaments/create')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Tournament
            </Button>
          </CardContent>
        </Card>
      )}

      {hasTournaments && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <CardTitle>Total Tournaments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{tournaments.length}</div>
                <p className="text-sm text-muted-foreground">Created so far</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <CardTitle>Upcoming</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{upcoming.length}</div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <CardTitle>Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completed.length}</div>
                <p className="text-sm text-muted-foreground">Finished</p>
              </CardContent>
            </Card>
          </div>

          {/* Next Tournament */}
          {nextTournament && (
            <Card>
              <CardHeader>
                <CardTitle>Next Tournament</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {nextTournament.tournament_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(nextTournament.start_date).toLocaleDateString()} •{' '}
                    {nextTournament.address?.district?.district_name ?? '—'}
                  </p>
                </div>
                <Badge>Upcoming</Badge>
              </CardContent>
            </Card>
          )}

          {/* Recent Tournaments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Tournaments</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="py-2 text-left">Tournament</th>
                    <th className="py-2 text-left">Dates</th>
                    <th className="py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTournaments.map((t) => {
                    const status =
                      new Date(t.end_date) < now ? 'Completed' : 'Upcoming';

                    return (
                      <tr
                        key={t.tournament_id}
                        className="border-b last:border-none"
                      >
                        <td className="py-2 font-medium">
                          {t.tournament_name}
                        </td>
                        <td className="py-2">
                          {new Date(t.start_date).toLocaleDateString()} –{' '}
                          {new Date(t.end_date).toLocaleDateString()}
                        </td>
                        <td className="py-2">
                          <Badge
                            variant={
                              status === 'Completed' ? 'secondary' : 'default'
                            }
                          >
                            {status}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default OrganizerDashboard;
