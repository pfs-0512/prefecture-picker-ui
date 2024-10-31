import { useState } from "react";
import { Map } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PrefectureSelector } from "./PrefectureSelector";
import { CityRegionSelector } from "./CityRegionSelector";
import { ScrollArea } from "./ui/scroll-area";
import { PREFECTURES, CITIES } from "@/data/locationData";

const LocationSelector = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const handleToggleAllPrefectures = () => {
    if (selectedPrefectures.length === PREFECTURES.length) {
      setSelectedPrefectures([]);
      setSelectedCities([]);
      setSelectedRegions([]);
    } else {
      setSelectedPrefectures([...PREFECTURES]);
    }
  };

  const handleToggleAllCities = () => {
    // Get all cities from selected prefectures
    const allCities = selectedPrefectures.flatMap(prefecture => 
      Object.keys(CITIES[prefecture] || {})
    );
    
    // Get all regions from all cities in selected prefectures
    const allRegions = selectedPrefectures.flatMap(prefecture =>
      Object.entries(CITIES[prefecture] || {}).flatMap(([_, regions]) => regions)
    );
    
    if (selectedCities.length === allCities.length) {
      setSelectedCities([]);
      setSelectedRegions([]);
    } else {
      setSelectedCities(allCities);
      setSelectedRegions(allRegions);
    }
  };

  // Group selected items by prefecture for display
  const selectedAreasByPrefecture = selectedPrefectures.reduce((acc, prefecture) => {
    const citiesInPrefecture = selectedCities.filter(city => 
      Object.keys(CITIES[prefecture] || {}).includes(city)
    );
    
    const regionsInPrefecture = selectedRegions.filter(region => 
      citiesInPrefecture.some(city => 
        CITIES[prefecture][city]?.includes(region)
      )
    );
    
    if (citiesInPrefecture.length > 0 || regionsInPrefecture.length > 0) {
      acc[prefecture] = [...citiesInPrefecture, ...regionsInPrefecture];
    }
    
    return acc;
  }, {} as Record<string, string[]>);

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
            <div className="flex justify-between items-center">
              <Label className="text-[#4F6B84] font-medium">都道府県</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleToggleAllPrefectures}
                className="text-[#4F6B84] border-[#4F6B84] hover:bg-[#4F6B84] hover:text-white"
              >
                {selectedPrefectures.length === PREFECTURES.length ? "全解除" : "全選択"}
              </Button>
            </div>
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
            <div className="flex justify-between items-center">
              <Label className="text-[#4F6B84] font-medium">市区町村・地域</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleToggleAllCities}
                className="text-[#4F6B84] border-[#4F6B84] hover:bg-[#4F6B84] hover:text-white"
                disabled={selectedPrefectures.length === 0}
              >
                {selectedCities.length === selectedPrefectures.flatMap(p => Object.keys(CITIES[p] || {})).length ? "全解除" : "全選択"}
              </Button>
            </div>
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

        {/* Selected Areas Display */}
        <div className="border rounded-md p-4">
          <h3 className="text-[#4F6B84] font-medium mb-4">選択中エリア</h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-4">
              {Object.entries(selectedAreasByPrefecture).map(([prefecture, areas]) => (
                <div key={prefecture} className="space-y-1">
                  <div className="font-medium">【{prefecture}】</div>
                  <div className="text-sm text-gray-600">
                    {areas.join('、')}
                  </div>
                </div>
              ))}
              {Object.keys(selectedAreasByPrefecture).length === 0 && (
                <div className="text-gray-500 text-sm">
                  エリアが選択されていません
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};

export default LocationSelector;