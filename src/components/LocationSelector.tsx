import { useState } from "react";
import { Map } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PrefectureSelector } from "./PrefectureSelector";
import { CityRegionSelector } from "./CityRegionSelector";

const LocationSelector = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const handleReset = () => {
    setSelectedPrefectures([]);
    setSelectedCities([]);
    setSelectedRegions([]);
  };

  return (
    <Card className="p-6 w-full max-w-3xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Map className="w-5 h-5" />
            <h2 className="text-xl font-bold">エリアを選択</h2>
          </div>
          <Button variant="outline" size="sm" onClick={handleReset}>
            リセット
          </Button>
        </div>

        <div className="flex gap-6">
          <div className="flex-1 space-y-2">
            <Label>都道府県</Label>
            <PrefectureSelector
              selectedPrefectures={selectedPrefectures}
              selectedCities={selectedCities}
              setSelectedPrefectures={setSelectedPrefectures}
              setSelectedCities={setSelectedCities}
              setSelectedRegions={setSelectedRegions}
            />
          </div>

          <div className="flex-1 space-y-2">
            <Label>市区町村・地域</Label>
            <CityRegionSelector
              selectedPrefectures={selectedPrefectures}
              selectedCities={selectedCities}
              selectedRegions={selectedRegions}
              setSelectedCities={setSelectedCities}
              setSelectedRegions={setSelectedRegions}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LocationSelector;