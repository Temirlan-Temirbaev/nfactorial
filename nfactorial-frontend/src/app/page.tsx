import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Rick and Morty Universe</h1>
        <p className="text-lg text-muted-foreground">
          Explore the multiverse of characters, episodes, and locations from the show
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/characters" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Characters</CardTitle>
              <CardDescription>Meet the diverse cast of characters</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Browse through all the characters from different dimensions and realities.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/episodes" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Episodes</CardTitle>
              <CardDescription>Watch all episodes from every season</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Discover all episodes and their details from the entire series.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/locations" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Locations</CardTitle>
              <CardDescription>Visit different places across dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Explore various locations from across the multiverse.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  );
}