import { Link } from "react-router";
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
      <div>
        {notes?.length ? (
          <div>
            {notes.map(({ id, content, title, tags }) => (
              <Link to={`${id}`}>
                <h2>{title}</h2>
                <ul>
                  {tags.map((tag) => (
                    <li>{tag}</li>
                  ))}
                </ul>
                <p>{content}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p>
            You don't have any notes yet. Start a new note to capture your
            thoughts and ideas.
          </p>
        )}
      </div>
      <Link to="create-note">+</Link>
    </div>
  );
}
