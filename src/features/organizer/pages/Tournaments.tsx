import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Input from "@/components/form/input"
import { useNavigate } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Eye, Pencil } from "lucide-react"
import { useMyTournaments } from "@/hooks/useTournament"

const Tournaments = () => {
  const navigate = useNavigate()

  // ✅ Correct hook usage
  const { data: tournaments = [], isLoading } = useMyTournaments()

  const getStatus = (endDate: string) =>
    new Date(endDate) < new Date() ? "Completed" : "Upcoming"

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-3">
        <p className="text-muted-foreground">Loading tournaments...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Tournaments</h1>
          <p className="text-muted-foreground">
            Manage and track your tournaments
          </p>
        </div>

        <Button
          className="flex items-center gap-2 w-fit"
          onClick={() => navigate("/organizer/tournaments/create")}
        >
          <Plus className="h-4 w-4" />
          Create Tournament
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input placeholder="Search by tournament name" />

        <Select>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Empty State */}
      {tournaments.length === 0 && (
        <Card className="py-16 text-center">
          <CardContent>
            <h3 className="text-lg font-semibold">
              No tournaments yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Create your first chess tournament
            </p>
            <Button
              onClick={() =>
                navigate("/organizer/tournaments/create")
              }
            >
              Create Tournament
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Desktop Table */}
      {tournaments.length > 0 && (
        <div className="hidden md:block">
          <Card>
            <CardHeader>
              <CardTitle>Tournaments</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2">Tournament</th>
                    <th>City</th>
                    <th>Dates</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tournaments.map((t) => {
                    const status = getStatus(t.end_date)

                    return (
                      <tr
                        key={t.tournament_id}
                        className="border-b last:border-none"
                      >
                        <td className="py-3 font-medium">
                          {t.tournament_name}
                        </td>

                        <td>
                          {t.address?.district?.district_name ?? "-"}
                        </td>

                        <td>
                          {new Date(t.start_date).toLocaleDateString()} –{" "}
                          {new Date(t.end_date).toLocaleDateString()}
                        </td>

                        <td>
                          <Badge
                            variant={
                              status === "Completed"
                                ? "secondary"
                                : "default"
                            }
                          >
                            {status}
                          </Badge>
                        </td>

                        <td className="text-right space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              navigate(
                                `/organizer/tournaments/${t.tournament_id}`
                              )
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              navigate(
                                `/organizer/tournaments/${t.tournament_id}/edit`
                              )
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Tournaments
