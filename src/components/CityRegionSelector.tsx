import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { CITIES } from "@/data/locationData";

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
    setSelectedCities(prev => {
      const newSelection = prev.includes(city)
        ? prev.filter(c => c !== city)
        : [...prev, city];
      
      if (!newSelection.includes(city)) {
        setSelectedRegions(prev =>
          prev.filter(region => !CITIES[prefecture][city]?.includes(region))
        );
      }
      return newSelection;
    });
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  return (
    <ScrollArea className="h-[400px] border rounded-md p-4">
      <div className="space-y-2">
        {selectedPrefectures.map(prefecture => (
          <div key={prefecture} className="mb-4">
            <h3 className="font-medium mb-2">{prefecture}</h3>
            <div className="space-y-4 ml-2">
              {Object.entries(CITIES[prefecture] || {}).map(([city, regions]) => (
                <div key={city}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={city}
                      checked={selectedCities.includes(city)}
                      onCheckedChange={() => handleCityChange(city, prefecture)}
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
                      {regions.map((region) => (
                        <div key={region} className="flex items-center space-x-2">
                          <Checkbox
                            id={region}
                            checked={selectedRegions.includes(region)}
                            onCheckedChange={() => handleRegionChange(region)}
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