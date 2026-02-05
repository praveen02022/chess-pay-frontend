import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Input from '@/components/form/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, Users } from 'lucide-react';

type Player = {
  id: string;
  name: string;
  fideId?: string;
  category: string;
  rating?: number;
  paymentStatus: 'Paid' | 'Pending';
};

const players: Player[] = [
  {
    id: '1',
    name: 'Arjun Kumar',
    fideId: '25123456',
    category: 'Open',
    rating: 1850,
    paymentStatus: 'Paid',
  },
  {
    id: '2',
    name: 'Ravi Teja',
    category: 'Under 15',
    rating: 1420,
    paymentStatus: 'Pending',
  },
];

const TournamentPlayers = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-3 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Players
          </h1>
          <p className="text-muted-foreground">District Open Chess 2026</p>
        </div>

        <Button className="flex items-center gap-2 w-fit">
          <Plus className="h-4 w-4" />
          Add Offline Player
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Total Players</p>
            <p className="text-2xl font-bold">48</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Paid</p>
            <p className="text-2xl font-bold text-green-600">36</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Categories</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search by name or FIDE ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="Under 15">Under 15</SelectItem>
            <SelectItem value="Under 10">Under 10</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Card>
          <CardHeader>
            <CardTitle>Registered Players</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-left text-muted-foreground">
                  <th className="py-2">Name</th>
                  <th>FIDE ID</th>
                  <th>Category</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p) => (
                  <tr key={p.id} className="border-b last:border-none">
                    <td className="py-3 font-medium">{p.name}</td>
                    <td>{p.fideId ?? '—'}</td>
                    <td>{p.category}</td>
                    <td>{p.rating ?? '—'}</td>
                    <td>
                      <Badge
                        variant={
                          p.paymentStatus === 'Paid' ? 'default' : 'secondary'
                        }
                      >
                        {p.paymentStatus}
                      </Badge>
                    </td>
                    <td className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {players.map((p) => (
          <Card key={p.id}>
            <CardContent className="space-y-2 pt-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{p.name}</h3>
                <Badge>{p.paymentStatus}</Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                Category: {p.category}
              </p>

              <p className="text-sm">
                FIDE: {p.fideId ?? '—'} | Rating: {p.rating ?? '—'}
              </p>

              <Button
                size="sm"
                variant="outline"
                className="w-full text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove Player
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {players.length === 0 && (
        <Card className="py-16 text-center">
          <CardContent>
            <h3 className="text-lg font-semibold">No players registered yet</h3>
            <p className="text-muted-foreground mb-4">
              Add offline players or wait for registrations
            </p>
            <Button>Add Player</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TournamentPlayers;
