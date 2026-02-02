import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Input from "@/components/form/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Trophy } from "lucide-react";

import { useCreateTournament } from "@/hooks/useTournament";
import { useCreateTournamentFees } from "@/hooks/useTournamentFees";
import { createTournamentAddressApi } from "@/lib/apis/tournamentAddress.api";
import { useStates, useDistricts, useTaluks } from "@/hooks/uselocation";

type FeeRow = {
  category: string;
  amount: string;
};

const CreateTournament = () => {
  const navigate = useNavigate();

  /* ---------------- Tournament ---------------- */
  const [tournamentName, setTournamentName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  /* ---------------- Address ---------------- */
  const [addressOne, setAddressOne] = useState("");
  const [pincode, setPincode] = useState("");
  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [talukId, setTalukId] = useState("");

  /* ---------------- Location APIs ---------------- */
  const { data: states = [] } = useStates();
  const { data: districts = [] } = useDistricts(stateId);
  const { data: taluks = [] } = useTaluks(districtId);

  const onStateChange = (value: string) => {
    setStateId(value);
    setDistrictId("");
    setTalukId("");
  };

  const onDistrictChange = (value: string) => {
    setDistrictId(value);
    setTalukId("");
  };

  /* ---------------- Fees ---------------- */
  const [fees, setFees] = useState<FeeRow[]>([
    { category: "", amount: "" },
  ]);

  const addFee = () =>
    setFees([...fees, { category: "", amount: "" }]);

  const removeFee = (index: number) =>
    setFees(fees.filter((_, i) => i !== index));

  const updateFee = (
    index: number,
    field: keyof FeeRow,
    value: string
  ) => {
    const updated = [...fees];
    updated[index][field] = value;
    setFees(updated);
  };

  /* ---------------- Mutations ---------------- */
  const createTournamentMutation = useCreateTournament();
  const createFeesMutation = useCreateTournamentFees();

  /* ---------------- Submit ---------------- */
  const handleCreateTournament = async () => {
    try {
      const tournamentRes =
        await createTournamentMutation.mutateAsync({
          tournament_name: tournamentName.trim(),
          start_date: new Date(startDate).toISOString(),
          end_date: new Date(endDate).toISOString(),
          broucher_url: null,
        });

      const tournamentId =
        tournamentRes.data.data.tournament_id;

      await createTournamentAddressApi(tournamentId, {
        address_one: addressOne,
        pincode,
        state_id: stateId,
        district_id: districtId,
        taluk_id: talukId,
        lat: 12.9716,
        lan: 77.5946,
      });

      await createFeesMutation.mutateAsync({
        tournamentId,
        fees: fees.map((f) => ({
          category: f.category,
          amount: Number(f.amount),
        })),
      });

      navigate("/organizer/tournaments");
    } catch (error) {
      console.error(error);
      alert("Failed to create tournament");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-3 pb-24">
      {/* Header */}
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Trophy className="h-6 w-6 text-primary" />
        Create Tournament
      </h1>

      {/* ---------------- Tournament ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Tournament</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <Input
            label="Tournament Name"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
            placeholder="Eg: District Open Chess Championship"
          />
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

      {/* ---------------- Address ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <Textarea
            placeholder="Venue address"
            value={addressOne}
            onChange={(e) => setAddressOne(e.target.value)}
          />

          <Input
            label="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />

          {/* State */}
          <div>
            <Label>State</Label>
            <Select value={stateId} onValueChange={onStateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="z-50 bg-white border shadow-lg rounded-md max-h-64 overflow-y-auto"
              >
                {states.map((state: any) => (
                  <SelectItem
                    key={state.state_id}
                    value={state.state_id}
                  >
                    {state.state_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* District */}
          <div>
            <Label>District</Label>
            <Select
              value={districtId}
              onValueChange={onDistrictChange}
              disabled={!stateId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-white border shadow-lg rounded-md max-h-60 overflow-y-auto">
                {districts.map((district: any) => (
                  <SelectItem
                    key={district.district_id}
                    value={district.district_id}
                  >
                    {district.district_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Taluk */}
          <div className="md:col-span-2">
            <Label>Taluk</Label>
            <Select
              value={talukId}
              onValueChange={setTalukId}
              disabled={!districtId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Taluk" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-white border shadow-lg rounded-md max-h-60 overflow-y-auto">
                {taluks.map((taluk: any) => (
                  <SelectItem
                    key={taluk.taluk_id}
                    value={taluk.taluk_id}
                  >
                    {taluk.taluk_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ---------------- Fees ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Fees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fees.map((fee, index) => (
            <div key={index} className="grid md:grid-cols-3 gap-4">
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
              {fees.length > 1 && (
                <Button
                  variant="destructive"
                  onClick={() => removeFee(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          <Button variant="outline" onClick={addFee}>
            <Plus className="h-4 w-4 mr-2" />
            Add Fee
          </Button>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          onClick={handleCreateTournament}
          disabled={
            !tournamentName ||
            !startDate ||
            !endDate ||
            createTournamentMutation.isPending
          }
        >
          {createTournamentMutation.isPending
            ? "Creating..."
            : "Create Tournament"}
        </Button>

      </div>
    </div>
  );
};

export default CreateTournament;
