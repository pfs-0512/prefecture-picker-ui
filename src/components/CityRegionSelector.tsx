import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { CITIES, PREFECTURES } from "@/data/locationData";

interface CityRegionSelectorProps {
  selectedPrefectures: string[];
  selectedCities: string[];
  selectedRegions: string[];
  setSelectedCities: (cities: string[]) => void;
  setSelectedRegions: (regions: string[]) => void;
}

export const CityRegionSelector = ({
  selectedPrefectures,
  selectedCities,
  selectedRegions,
  setSelectedCities,
  setSelectedRegions,
}: CityRegionSelectorProps) => {
  const handleCityChange = (city: string, prefecture: string) => {
    const newSelection = selectedCities.includes(city)
      ? selectedCities.filter(c => c !== city)
      : [...selectedCities, city];
    
    setSelectedCities(newSelection);
    
    if (!newSelection.includes(city)) {
      const updatedRegions = selectedRegions.filter(region => 
        !CITIES[prefecture][city]?.includes(region)
      );
      setSelectedRegions(updatedRegions);
    }
  };

  const handleRegionChange = (region: string) => {
    const newSelection = selectedRegions.includes(region)
      ? selectedRegions.filter(r => r !== region)
      : [...selectedRegions, region];
    
    setSelectedRegions(newSelection);
  };

  // PREFECTURESの順序に基づいて選択された都道府県をソート
  const sortedPrefectures = PREFECTURES.filter(pref => 
    selectedPrefectures.includes(pref)
  );

  return (
    <ScrollArea className="h-[400px] p-4">
      <div className="space-y-2">
        {sortedPrefectures.map(prefecture => (
          <div key={prefecture} className="mb-4">
            <h3 className="font-medium mb-2 text-[#4F6B84]">{prefecture}</h3>
            <div className="space-y-4 ml-2">
              {Object.entries(CITIES[prefecture] || {}).map(([city, regions]) => (
                <div key={city}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={city}
                      checked={selectedCities.includes(city)}
                      onCheckedChange={() => handleCityChange(city, prefecture)}
                      className="border-gray-400 data-[state=checked]:bg-[#4F6B84] data-[state=checked]:border-[#4F6B84]"
                    />
                    <label
                      htmlFor={city}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {city}
                    </label>
                  </div>
                  {selectedCities.includes(city) && (
                    <div className="ml-4 space-y-2">
                      {(regions as string[]).map((region) => (
                        <div key={region} className="flex items-center space-x-2">
                          <Checkbox
                            id={region}
                            checked={selectedRegions.includes(region)}
                            onCheckedChange={() => handleRegionChange(region)}
                            className="border-gray-400 data-[state=checked]:bg-[#4F6B84] data-[state=checked]:border-[#4F6B84]"
                          />
                          <label
                            htmlFor={region}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {region}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {selectedPrefectures.length === 0 && (
          <div className="text-sm text-muted-foreground">
            都道府県を選択してください
          </div>
        )}
      </div>
    </ScrollArea>
  );
};