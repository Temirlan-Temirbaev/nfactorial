'use client';

import { useEpisodeControllerGetAll } from "@/shared/api/generated/episodes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EpisodesPage() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const router = useRouter();

  const { data, isLoading } = useEpisodeControllerGetAll({
    page,
    name,
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Episodes</h1>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by name or episode code..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Episode</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Air Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.results && data?.results.map((episode) => (
              <TableRow key={episode.id} className="cursor-pointer" onClick={() => router.push(`/episodes/${episode.id}`)}>
                <TableCell>{episode.episode}</TableCell>
                <TableCell>{episode.name}</TableCell>
                <TableCell>{episode.air_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-muted-foreground">
          {data?.info && data?.info.count ? `Total: ${data.info.count} episodes` : ''}
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