'use client';

import { useEpisodeControllerGetEpisode } from "@/shared/api/generated/episodes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function EpisodeDetailsSkeleton() {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>
          <div className="h-8 w-2/3 bg-muted rounded-lg animate-pulse" />
          <div className="h-6 w-1/2 bg-muted rounded-lg mt-2 animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="font-semibold mb-4">Characters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="h-12 bg-muted rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EpisodeDetailsPage({ params }: { params: { id: string } }) {
  const { data, isLoading } = useEpisodeControllerGetEpisode(params.id);

  if (isLoading) return (
    <main className="container mx-auto px-4 py-8">
      <div className="h-10 w-24 bg-muted rounded mb-4 animate-pulse" />
      <EpisodeDetailsSkeleton />
    </main>
  );
  if (!data) return <div>Episode not found</div>;
  if (Array.isArray(data)) return null;
  return (
    <main className="container mx-auto px-4 py-8">
      <Button asChild variant="outline" className="mb-4">
        <Link href="/episodes">← Back to Episodes</Link>
      </Button>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl">{data.name}</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Episode: {data.episode} | Air Date: {data.air_date}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <h3 className="font-semibold mb-4">Characters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.characters.map((character) => {
                const characterId = character.split('/').pop();
                return <Link 
                  key={characterId}
                  href={`/characters/${characterId}`}
                  className="flex items-center gap-2 p-2 bg-secondary rounded hover:bg-secondary/80 transition-colors"
                >
                  Character #{characterId}
                </Link>
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}