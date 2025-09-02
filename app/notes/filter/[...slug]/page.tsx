import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";


type Props = {
    params: Promise<{ slug: string[] }>
};

export default async function Notes({ params }: Props) {
     const { slug } = await params;
  const queryClient = new QueryClient();
  const tag = slug[0] === "All" ? undefined : (slug[0] as NoteTag);

    await queryClient.prefetchQuery({
      queryKey:  ["notes", { page: 1, search: "", perPage: 12, tag }],
      queryFn: () => fetchNotes(1, "", 12, tag),
        
      });
    
      return (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NotesClient tag = {tag} />
        </HydrationBoundary>
    );
    
    
}