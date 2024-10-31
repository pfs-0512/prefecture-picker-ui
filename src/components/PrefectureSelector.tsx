import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { PREFECTURES } from "@/data/locationData";

interface PrefectureSelectorProps {
  selectedPrefectures: string[];
  setSelectedPrefectures: (prefectures: string[]) => void;
  setSelectedCities: (cities: string[]) => void;
  setSelectedRegions: (regions: string[]) => void;
}

export const PrefectureSelector = ({
  selectedPrefectures,
  setSelectedPrefectures,
  setSelectedCities,
  setSelectedRegions,
}: PrefectureSelectorProps) => {
  const handlePrefectureChange = (prefecture: string) => {
    setSelectedPrefectures(prev => {
      const newSelection = prev.includes(prefecture)
        ? prev.filter(p => p !== prefecture)
        : [...prev, prefecture];
      
      if (!newSelection.includes(prefecture)) {
        setSelectedCities(prev => 
          prev.filter(city => !Object.keys(CITIES[prefecture] || {}).includes(city))
        );
        setSelectedRegions([]);
      }
      return newSelection;
    });
  };

  return (
    <ScrollArea className="h-[400px] border rounded-md p-4">
      <div className="space-y-2">
        {PREFECTURES.map((pref) => (
          <div key={pref} className="flex items-center space-x-2">
            <Checkbox
              id={pref}
              checked={selectedPrefectures.includes(pref)}
              onCheckedChange={() => handlePrefectureChange(pref)}
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