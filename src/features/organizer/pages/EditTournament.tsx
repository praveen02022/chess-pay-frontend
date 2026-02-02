import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Input from "@/components/form/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save } from "lucide-react"

import { useTournamentDetails } from "@/hooks/useTournament"
import { useUpdateTournament } from "@/hooks/useTournament"
import { updateTournamentAddressApi } from "@/lib/apis/tournamentAddress.api"
import { useUpdateTournamentFees } from "@/hooks/useTournamentFees"

type FeeRow = {
  fee_id?: string
  category: string
  amount: string
}

const EditTournament = () => {
  const { tournamentId } = useParams()
  const navigate = useNavigate()

  const { tournament, isLoading } =
    useTournamentDetails(tournamentId as string)

  const updateTournament = useUpdateTournament()
  const updateFees = useUpdateTournamentFees()

  /* ---------------- Tournament ---------------- */
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  /* ---------------- Address ---------------- */
  const [addressOne, setAddressOne] = useState("")
  const [pincode, setPincode] = useState("")

  /* ---------------- Fees ---------------- */
  const [fees, setFees] = useState<FeeRow[]>([])

  /* ---------------- Prefill ---------------- */
  useEffect(() => {
    if (!tournament) return

    setStartDate(tournament.start_date.split("T")[0])
    setEndDate(tournament.end_date.split("T")[0])

    if (tournament.address) {
      setAddressOne(tournament.address.address_one)
      setPincode(tournament.address.pincode)
    }

    setFees(
      tournament.fees.map((f: any) => ({
        fee_id: f.fee_id,
        category: f.category,
        amount: String(f.amount),
      }))
    )
  }, [tournament])

  if (isLoading) return <p>Loading…</p>
  if (!tournament) return <p>Not found</p>

  /* ---------------- Fees Helpers ---------------- */
  const addFee = () =>
    setFees([...fees, { category: "", amount: "" }])

  const removeFee = (index: number) =>
    setFees(fees.filter((_, i) => i !== index))

  const updateFee = (
    index: number,
    field: keyof FeeRow,
    value: string
  ) => {
    const updated = [...fees]
    updated[index][field] = value
    setFees(updated)
  }

  /* ---------------- Save ---------------- */
  const handleSave = async () => {
    try {
      /* 1️⃣ Tournament */
      await updateTournament.mutateAsync({
        tournamentId: tournament.tournament_id,
        data: {
          start_date: new Date(startDate).toISOString(),
          end_date: new Date(endDate).toISOString(),
        },
      })

      /* 2️⃣ Address */
      if (tournament.address) {
        await updateTournamentAddressApi(tournament.tournament_id, {
          address_one: addressOne,
          pincode,
        })
      }

      /* 3️⃣ Fees (replace strategy) */
      await updateFees.mutateAsync({
        tournamentId: tournament.tournament_id,
        fees: fees.map((f) => ({
          category: f.category,
          amount: Number(f.amount),
        })),
      })

      navigate(`/organizer/tournaments/${tournamentId}`)
    } catch (err) {
      console.error(err)
      alert("Failed to update tournament")
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      <h1 className="text-2xl font-bold">Edit Tournament</h1>

      {/* Tournament */}
      <Card>
        <CardHeader>
          <CardTitle>Tournament Dates</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle>Venue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            label="Address"
            value={addressOne}
            onChange={(e) => setAddressOne(e.target.value)}
          />
          <Input
            label="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Fees */}
      <Card>
        <CardHeader>
          <CardTitle>Entry Fees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fees.map((fee, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
            >
              <Input
                label="Category"
                value={fee.category}
                onChange={(e) =>
                  updateFee(index, "category", e.target.value)
                }
              />
              <Input
                label="Amount"
                type="number"
                value={fee.amount}
                onChange={(e) =>
                  updateFee(index, "amount", e.target.value)
                }
              />
              <Button
                variant="destructive"
                onClick={() => removeFee(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={addFee}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Fee
          </Button>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="flex gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default EditTournament
