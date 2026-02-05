import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, IndianRupee, Pencil } from 'lucide-react';
import { useTournamentDetails } from '@/hooks/useTournament';

export default function TournamentDetails() {
  const { tournamentId } = useParams();
  const navigate = useNavigate();

  const { tournament, isLoading } = useTournamentDetails(
    tournamentId as string
  );

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-muted-foreground">Loading tournament details…</p>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-red-500">Tournament not found</p>
      </div>
    );
  }

  const status =
    new Date(tournament.end_date) < new Date() ? 'Completed' : 'Upcoming';

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      {/* ===== Header ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Tournament Details
          </h1>
          <p className="text-muted-foreground text-sm">
            Name: {tournament.tournament_name}
          </p>
        </div>

        <Badge
          variant={status === 'Completed' ? 'secondary' : 'default'}
          className="w-fit"
        >
          {status}
        </Badge>
      </div>

      {/* ===== Tournament Dates ===== */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <CardTitle>Tournament Schedule</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="font-medium">
              {new Date(tournament.start_date).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">End Date</p>
            <p className="font-medium">
              {new Date(tournament.end_date).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ===== Venue ===== */}
      {tournament.address && (
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle>Venue Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">{tournament.address.address_one}</p>

            <p className="text-sm text-muted-foreground">
              {tournament.address.district?.district_name},{' '}
              {tournament.address.state?.state_name}
            </p>

            <p className="text-sm">
              <span className="text-muted-foreground">Pincode:</span>{' '}
              {tournament.address.pincode}
            </p>
          </CardContent>
        </Card>
      )}

      {/* ===== Fees ===== */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <IndianRupee className="h-5 w-5 text-primary" />
          <CardTitle>Entry Fees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tournament.fees.length === 0 && (
            <p className="text-muted-foreground">No entry fees configured</p>
          )}

          {tournament.fees.map((fee: any) => (
            <div
              key={fee.fee_id}
              className="flex justify-between items-center rounded-md border px-3 py-2"
            >
              <span className="font-medium">{fee.category}</span>
              <span className="text-sm font-semibold">₹ {fee.amount}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ===== Actions ===== */}
      <div className="flex justify-end gap-3 pt-2">
        <Button
          variant="outline"
          onClick={() =>
            navigate(`/organizer/tournaments/${tournamentId}/edit`)
          }
          className="flex items-center gap-2"
        >
          <Pencil className="h-4 w-4" />
          Edit Tournament
        </Button>
      </div>
    </div>
  );
}
