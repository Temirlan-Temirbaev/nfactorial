'use client';

import { useLocationControllerGetLocation } from "@/shared/api/generated/locations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function LocationDetailsPage() {
  const params : {id: string}= useParams();
  const { data, isLoading } = useLocationControllerGetLocation(params.id);

  if (isLoading) return <LocationDetailsSkeleton />;
  if (!data) return <div>Location not found</div>;
  if (Array.isArray(data)) return null;
  return (
    <main className="container mx-auto px-4 py-8">
      <Button asChild variant="outline" className="mb-4">
        <Link href="/locations">← Back to Locations</Link>
      </Button>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl">{data.name}</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Type: {data.type} | Dimension: {data.dimension}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <h3 className="font-semibold mb-4">Residents</h3>
            <div className="grid grid-cols-1 gap-4">
              {data.residents.map((resident) => {
                const residentId = resident.split('/').pop();
                return <Link 
                  key={residentId}
                  href={`/characters/${residentId}`}
                  className="flex items-center gap-2 p-2 bg-secondary rounded hover:bg-secondary/80 transition-colors"
                >
                  Character #{residentId}
                </Link>
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}


function LocationDetailsSkeleton() {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>
          <div className="h-8 w-64 bg-muted rounded animate-pulse" />
          <div className="h-6 w-96 bg-muted rounded mt-2 animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-6 w-32 bg-muted rounded mb-4 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="h-12 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}