import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { PREFECTURES, CITIES } from "@/data/locationData";

interface PrefectureSelectorProps {
  selectedPrefectures: string[];
  selectedCities: string[];
  setSelectedPrefectures: (prefectures: string[]) => void;
  setSelectedCities: (cities: string[]) => void;
  setSelectedRegions: (regions: string[]) => void;
}

export const PrefectureSelector = ({
  selectedPrefectures,
  selectedCities,
  setSelectedPrefectures,
  setSelectedCities,
  setSelectedRegions,
}: PrefectureSelectorProps) => {
  const handlePrefectureChange = (prefecture: string) => {
    const newSelection = selectedPrefectures.includes(prefecture)
      ? selectedPrefectures.filter(p => p !== prefecture)
      : [...selectedPrefectures, prefecture];
    
    setSelectedPrefectures(newSelection);
    
    if (!newSelection.includes(prefecture)) {
      const updatedCities = selectedCities.filter(city => 
        !Object.keys(CITIES[prefecture] || {}).includes(city)
      );
      setSelectedCities(updatedCities);
      setSelectedRegions([]);
    }
  };

  return (
    <ScrollArea className="h-[400px] p-4">
      <div className="space-y-2">
        {PREFECTURES.map((pref) => (
          <div key={pref} className="flex items-center space-x-2">
            <Checkbox
              id={pref}
              checked={selectedPrefectures.includes(pref)}
              onCheckedChange={() => handlePrefectureChange(pref)}
              className="border-gray-400 data-[state=checked]:bg-[#4F6B84] data-[state=checked]:border-[#4F6B84]"
            />
            <label
              htmlFor={pref}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {pref}
            </label>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};