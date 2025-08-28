import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
    params: Promise<{ page: number, search: string, perPage: number }>
};

export default async function Notes({ params }: Props) {
    const { page, search, perPage} = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", page, search, perPage],
        queryFn: () => fetchNotes(page, search, perPage),
        
      });
    
      return (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NotesClient />
        </HydrationBoundary>
    );
    
    
}