
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full flex justify-between items-center py-4 px-6">
      <div className="w-80 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search destinations..."
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button className="bg-blue-500 hover:bg-blue-600">
        Sign In
      </Button>
    </div>
  );
}
