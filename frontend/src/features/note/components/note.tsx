import { trpc } from "#frontend/lib/trpc";

export function Note() {
  const { data: notes, isPending, error } = trpc.note.getAllNotes.useQuery();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <h1>All Notes</h1>
    </div>
  );
}
