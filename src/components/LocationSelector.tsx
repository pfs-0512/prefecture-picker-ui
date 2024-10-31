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
    <Card className="w-full max-w-4xl mx-auto">
      <div className="bg-[#4F6B84] text-white p-4">
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5" />
          <h2 className="text-lg font-medium">対象エリア</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex gap-6">
          <div className="flex-1 space-y-2">
            <Label className="text-[#4F6B84] font-medium">都道府県</Label>
            <div className="bg-background border border-gray-200 rounded-sm">
              <PrefectureSelector
                selectedPrefectures={selectedPrefectures}
                selectedCities={selectedCities}
                setSelectedPrefectures={setSelectedPrefectures}
                setSelectedCities={setSelectedCities}
                setSelectedRegions={setSelectedRegions}
              />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <Label className="text-[#4F6B84] font-medium">市区町村・地域</Label>
            <div className="bg-background border border-gray-200 rounded-sm">
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

        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset}
            className="text-[#4F6B84] border-[#4F6B84] hover:bg-[#4F6B84] hover:text-white"
          >
            リセット
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LocationSelector;