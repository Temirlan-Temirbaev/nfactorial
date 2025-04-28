'use client';

import { useCharacterControllerGetCharacter } from "@/shared/api/generated/characters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CharacterDetailsPage() {
  const params : {id: string}= useParams();
  const { data, isLoading } = useCharacterControllerGetCharacter(params.id);

  if (isLoading) return <CharacterDetailsSkeleton />;
  if (!data) return <div>Character not found</div>;

  if (Array.isArray(data)) return null;

  return (
    <main className="container mx-auto px-4 py-8">
      <Button asChild variant="outline" className="mb-4">
        <Link href="/characters">← Back to Characters</Link>
      </Button>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <img 
              src={data.image} 
              alt={data.name} 
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl">{data.name}</h1>
              <p className="text-xl text-muted-foreground">{data.species}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Status</h3>
                <p>{data.status}</p>
              </div>
              <div>
                <h3 className="font-semibold">Gender</h3>
                <p>{data.gender}</p>
              </div>
              <div>
                <h3 className="font-semibold">Origin</h3>
                <span className="text-primary">
                    {data.origin.name}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">Current Location</h3>
                <Link href={`/locations/${data.location.url.split("/").pop()}`} className="text-primary">
                  {data.location.name}
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Episodes</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {data.episode.map((episode) => (
                  <Link 
                    href={`/episodes/${episode.split("/").pop()}`}
                    className="p-2 bg-secondary rounded hover:bg-secondary/80 transition-colors"
                  >
                    {episode.split('/').pop()}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

function CharacterDetailsSkeleton() {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-muted animate-pulse" />
          <div>
            <div className="h-8 w-48 bg-muted rounded mb-2 animate-pulse" />
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <div className="h-5 w-24 bg-muted rounded mb-2 animate-pulse" />
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div>
            <div className="h-6 w-24 bg-muted rounded mb-4 animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-10 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}