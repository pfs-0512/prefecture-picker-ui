import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const EmailInput = () => {
  return (
    <Card className="w-full">
      <div className="bg-[#4F6B84] text-white p-4">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          <h2 className="text-lg font-medium">メールアドレス</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#4F6B84] font-medium">
            メールアドレス
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="example@example.com"
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
};

export default EmailInput;