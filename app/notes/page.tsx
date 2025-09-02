import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getNotes } from "@/lib/api"; // Використовуємо правильну функцію
import NotesClient from "./Notes.client";

type Props = {
  params: { tag: string }; // Отримуємо тег з URL
};

export default async function FilteredNotesPage({ params }: Props) {
  const { tag } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag], // Додаємо тег в queryKey
    queryFn: () => getNotes(tag === "All notes" ? undefined : tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} /> // Передаємо тег в NotesClient
    </HydrationBoundary>
  );
}
