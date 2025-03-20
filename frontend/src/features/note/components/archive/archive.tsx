import { Outlet } from "react-router";
import { trpc } from "#frontend/lib/trpc";
import { formatDate } from "#frontend/utils/intl";

export function NoteArchive() {
  const {
    data: notes,
    isPending,
    error,
  } = trpc.note.getAllArchivedNotes.useQuery();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <h1>Archived Notes</h1>
      <p>
        All your archived notes are stored here. You can restore or delete them
        anytime.
      </p>
      {!notes?.length ? (
        <p>
          No notes have been archived yet. Move notes here for safekeeping, or
          create a new note.
        </p>
      ) : (
        <ul>
          {notes?.map((note) => (
            <li>
              <h2>{note.title}</h2>
              <ul>
                {note.tags.map((tag) => (
                  <li>{tag}</li>
                ))}
              </ul>
              <p>{formatDate(new Date(note.updatedAt))}</p>
            </li>
          ))}
        </ul>
      )}
      <Outlet />
    </div>
  );
}
