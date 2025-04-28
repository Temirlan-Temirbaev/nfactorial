'use client';

import { useCharacterControllerGetAll } from "@/shared/api/generated/characters";
import { CharacterControllerGetAllGender, CharacterControllerGetAllStatus } from "@/shared/api/generated/model";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CharactersPage() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const router = useRouter();
  const [status, setStatus] = useState<CharacterControllerGetAllStatus>();
  const [gender, setGender] = useState<CharacterControllerGetAllGender>();

  const { data, isLoading } = useCharacterControllerGetAll({
    page,
    name,
    status,
    gender,
  });

  // Add this skeleton component at the top of the file
  
  function CharacterCardSkeleton() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-5 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex justify-between">
                <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // In your main component, update the loading state:
  if (isLoading && name.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Characters</h1>
        <div className="flex gap-4 mb-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-10 w-[180px] bg-muted rounded animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <CharacterCardSkeleton key={index} />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Characters</h1>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="max-w-xs"
        />
        <Select value={status} onValueChange={(value: CharacterControllerGetAllStatus) => setStatus(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alive">Alive</SelectItem>
            <SelectItem value="dead">Dead</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
        <Select value={gender} onValueChange={(value: CharacterControllerGetAllGender) => setGender(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="genderless">Genderless</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.results && data?.results.map((character) => (
          <Card key={character.id} className="cursor-pointer" onClick={() => router.push(`/characters/${character.id}`)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <img 
                  src={character.image} 
                  alt={character.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  {character.name}
                  <div className="text-sm font-normal text-muted-foreground">
                    {character.species}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">{character.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gender:</span>
                  <span className="font-medium">{character.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Origin:</span>
                  <span className="font-medium">{character.origin.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{character.location.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-muted-foreground">
          {data?.info && data?.info.count ? `Total: ${data.info.count} characters` : ''}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1 || isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={data?.info && !data?.info.next || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </main>
  );
}