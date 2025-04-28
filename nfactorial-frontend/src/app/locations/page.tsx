'use client';

import { useLocationControllerGetAll } from "@/shared/api/generated/locations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LocationsPage() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [dimension, setDimension] = useState("");
  const router = useRouter();

  const { data, isLoading } = useLocationControllerGetAll({
    page,
    name,
    type,
    dimension,
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Locations</h1>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Filter by type..."
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Filter by dimension..."
          value={dimension}
          onChange={(e) => setDimension(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Dimension</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.results && data?.results.map((location) => (
              <TableRow key={location.id} className="cursor-pointer" onClick={() => router.push(`/locations/${location.id}`)}>
                <TableCell>{location.name}</TableCell>
                <TableCell>{location.type}</TableCell>
                <TableCell>{location.dimension}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-muted-foreground">
          {data?.info && data?.info.count ? `Total: ${data.info.count} locations` : ''}
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
