import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Input from "@/components/form/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Settings, Save } from "lucide-react"

const TournamentSettings = () => {
  const [registrationOpen, setRegistrationOpen] = useState(true)

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-3 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" />
          Tournament Settings
        </h1>
        <p className="text-muted-foreground">
          Manage configuration for this tournament
        </p>
      </div>

      {/* Tournament Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Tournament Name" value="District Open Chess 2026" />
          <Input label="Organizer Name" value="Vishwa" disabled />
          <Input label="Start Date" type="date" />
          <Input label="End Date" type="date" />

          <div className="md:col-span-2">
            <Label>Description / Notes</Label>
            <Textarea
              rows={3}
              placeholder="Additional information for players"
            />
          </div>
        </CardContent>
      </Card>

      {/* Venue */}
      <Card>
        <CardHeader>
          <CardTitle>Venue / Address</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Textarea
            rows={3}
            placeholder="Venue address"
          />
          <Input label="Pincode" type="number" />
          <Input label="State" value="Tamil Nadu" />
          <Input label="District" value="Chennai" />
          <Input label="Taluk" value="Adyar" />
        </CardContent>
      </Card>

      {/* Fees */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Open Category</p>
              <p className="text-sm text-muted-foreground">
                ₹500
              </p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Under 15</p>
              <p className="text-sm text-muted-foreground">
                ₹300
              </p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>

          <Button variant="outline">Add Fee Category</Button>
        </CardContent>
      </Card>

      {/* Registration Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Registration</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Registration Open
            </p>
            <p className="text-sm text-muted-foreground">
              Toggle to allow or stop new registrations
            </p>
          </div>

          <Switch
            checked={registrationOpen}
            onCheckedChange={setRegistrationOpen}
          />
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <p className="font-medium">Archive Tournament</p>
              <p className="text-sm text-muted-foreground">
                Hide this tournament from public view
              </p>
            </div>
            <Button variant="outline">Archive</Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <p className="font-medium text-destructive">
                Delete Tournament
              </p>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone
              </p>
            </div>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>
          <Save className="h-4 w-4 mr-1" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default TournamentSettings
