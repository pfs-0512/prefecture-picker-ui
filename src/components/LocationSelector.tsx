import { useState } from "react";
import { Map } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// 都道府県データ
const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "東京都", "大阪府", "愛知県", "福岡県",
];

// 市区町村・地域データ
const CITIES: { [key: string]: { [key: string]: string[] } } = {
  "北海道": {
    "札幌市": [
      "札幌駅・大通公園",
      "すすきの・中島公園",
      "札幌市内南部（平岸・真駒内）",
      "札幌市内西部（琴似・発寒）",
      "札幌市内東部（元町・苗穂）"
    ],
    "函館市": ["函館山周辺", "五稜郭周辺", "湯の川温泉"],
    "旭川市": ["旭川駅周辺", "旭山動物園周辺"],
    "釧路市": ["釧路駅周辺", "釧路湿原周辺"],
    "帯広市": ["帯広駅周辺", "とかちむら周辺"],
  },
  "東京都": {
    "渋谷区": ["渋谷駅周辺", "原宿・表参道", "代官山・恵比寿"],
    "新宿区": ["新宿駅周辺", "高田馬場", "神楽坂"],
    "港区": ["六本木", "赤坂", "お台場"],
    "千代田区": ["東京駅周辺", "秋葉原", "神田"],
    "中央区": ["銀座", "築地", "日本橋"],
    "品川区": ["品川駅周辺", "大崎", "五反田"],
  },
  "大阪府": {
    "大阪市": ["梅田・大阪駅", "難波・心斎橋", "天王寺・あべの"],
    "堺市": ["堺東駅周辺", "堺泉北", "美原区"],
    "豊中市": ["豊中駅周辺", "千里中央"],
    "吹田市": ["江坂", "万博記念公園周辺"],
    "高槻市": ["高槻駅周辺", "摂津富田"],
  },
  "愛知県": {
    "名古屋市": ["名古屋駅周辺", "栄・錦", "大須・上前津"],
    "豊田市": ["豊田市駅周辺", "トヨタ本社周辺"],
    "岡崎市": ["岡崎駅周辺", "東岡崎駅周辺"],
  },
  "福岡県": {
    "福岡市": ["天神・大名", "博多駅周辺", "中洲・川端"],
    "北九州市": ["小倉駅周辺", "門司港レトロ", "八幡"],
    "久留米市": ["久留米駅周辺", "六ツ門周辺"],
  }
};

const LocationSelector = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

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
            <Label>市区町村・地域</Label>
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
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LocationSelector;
