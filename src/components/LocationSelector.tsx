import { useState } from "react";
import { Map, ChevronDown, CircleCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// 都道府県データ（一部抜粋）
const PREFECTURES = [
  "北海道", "東京都", "大阪府", "愛知県", "福岡県",
  // ... 他の都道府県
];

// 市区町村データ（デモ用）
const CITIES: { [key: string]: string[] } = {
  "東京都": ["渋谷区", "新宿区", "港区", "千代田区"],
  "大阪府": ["大阪市", "堺市", "豊中市"],
  // ... 他の市区町村
};

const LocationSelector = () => {
  const [prefecture, setPrefecture] = useState<string>("");
  const [city, setCity] = useState<string>("");

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <Map className="w-5 h-5" />
          <h2 className="text-xl font-bold">住所を選択</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>都道府県</Label>
            <Select value={prefecture} onValueChange={setPrefecture}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="都道府県を選択" />
              </SelectTrigger>
              <SelectContent>
                {PREFECTURES.map((pref) => (
                  <SelectItem key={pref} value={pref}>
                    <div className="flex items-center gap-2">
                      {prefecture === pref && (
                        <CircleCheck className="w-4 h-4 text-green-500" />
                      )}
                      {pref}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>市区町村</Label>
            <Select
              value={city}
              onValueChange={setCity}
              disabled={!prefecture}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="市区町村を選択" />
              </SelectTrigger>
              <SelectContent>
                {prefecture &&
                  CITIES[prefecture]?.map((city) => (
                    <SelectItem key={city} value={city}>
                      <div className="flex items-center gap-2">
                        {city === city && (
                          <CircleCheck className="w-4 h-4 text-green-500" />
                        )}
                        {city}
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LocationSelector;