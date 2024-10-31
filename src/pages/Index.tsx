import CarTypeSelector from "@/components/CarTypeSelector";
import LocationSelector from "@/components/LocationSelector";
import EmailInput from "@/components/EmailInput";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-[#4F6B84] mb-6">
          一般店マッチング条件
        </h1>
        <EmailInput />
        <CarTypeSelector />
        <LocationSelector />
      </div>
    </div>
  );
};

export default Index;