import { useState } from "react";
import { Map, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// 都道府県データ（一部抜粋）
const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "東京都", "大阪府", "愛知県", "福岡県",
  // ... 他の都道府県
];

// 市区町村データ（デモ用）
const CITIES: { [key: string]: string[] } = {
  "東京都": ["渋谷区", "新宿区", "港区", "千代田区", "中央区", "品川区"],
  "大阪府": ["大阪市", "堺市", "豊中市", "吹田市", "高槻市"],
  "北海道": ["札幌市", "函館市", "旭川市", "釧路市", "帯広市"],
  // ... 他の市区町村
};

const LocationSelector = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const handlePrefectureChange = (prefecture: string) => {
    setSelectedPrefectures(prev => {
      const newSelection = prev.includes(prefecture)
        ? prev.filter(p => p !== prefecture)
        : [...prev, prefecture];
      
      // 都道府県が解除された場合、その都道府県の市区町村も選択解除
      if (!newSelection.includes(prefecture)) {
        setSelectedCities(prev => 
          prev.filter(city => !CITIES[prefecture]?.includes(city))
        );
      }
      return newSelection;
    });
  };

  const handleCityChange = (city: string) => {
    setSelectedCities(prev =>
      prev.includes(city)
        ? prev.filter(c => c !== city)
        : [...prev, city]
    );
  };

  const handleReset = () => {
    setSelectedPrefectures([]);
    setSelectedCities([]);
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
          </div>

          <div className="flex-1 space-y-2">
            <Label>市区町村</Label>
            <ScrollArea className="h-[400px] border rounded-md p-4">
              <div className="space-y-2">
                {selectedPrefectures.map(prefecture => (
                  <div key={prefecture} className="mb-4">
                    <h3 className="font-medium mb-2">{prefecture}</h3>
                    <div className="space-y-2 ml-2">
                      {CITIES[prefecture]?.map((city) => (
                        <div key={city} className="flex items-center space-x-2">
                          <Checkbox
                            id={city}
                            checked={selectedCities.includes(city)}
                            onCheckedChange={() => handleCityChange(city)}
                          />
                          <label
                            htmlFor={city}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {city}
                          </label>
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
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LocationSelector;