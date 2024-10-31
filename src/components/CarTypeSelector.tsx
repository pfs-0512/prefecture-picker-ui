import { useState } from "react";
import { Car } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const CarTypeSelector = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const carTypes = [
    { id: "domestic", label: "国産車" },
    { id: "imported", label: "輸入車" },
  ];

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <Card className="w-full">
      <div className="bg-[#4F6B84] text-white p-4">
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5" />
          <h2 className="text-lg font-medium">国産車・輸入車</h2>
        </div>
      </div>

      <div className="p-6 bg-[#FFFBE5]">
        <div className="space-y-4">
          {carTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={selectedTypes.includes(type.id)}
                onCheckedChange={() => handleTypeChange(type.id)}
                className="border-gray-400 data-[state=checked]:bg-[#4F6B84] data-[state=checked]:border-[#4F6B84]"
              />
              <Label
                htmlFor={type.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CarTypeSelector;