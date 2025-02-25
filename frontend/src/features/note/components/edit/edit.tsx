import { FormEvent, useState } from "react";
import { Link, useParams } from "react-router";
import { TextArea } from "#frontend/components/ui/form/textarea/textarea";
import { trpc } from "#frontend/lib/trpc";
import { SchemaError } from "#frontend/types/zod";
import { nonemptyStringSchema } from "#shared/types/zod";
import { Archive, Bin } from "#frontend/components/ui/image/icon/icon";

export function NoteEditForm() {
  const [fieldErrors, setFieldErrors] = useState<
    SchemaError<typeof nonemptyStringSchema>
  >({});
  const params = useParams<{ id: string }>();
  const { isSuccess, isPending, error } = trpc.note.getNote.useQuery({
    noteId: Number(params.id),
  });
  const { mutate } = trpc.note.updateNote.useMutation();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));
    const parsedData = nonemptyStringSchema.safeParse(formData);

    if (!parsedData.success) {
      setFieldErrors(parsedData.error.flatten().fieldErrors);
      return;
    }

    mutate(parsedData.data, {
      onError: (error) => {
        console.log("backend error:", error.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Link to="/home">Go Back</Link>
        <div>
          <button type="button">
            <Bin />
          </button>
          <button type="button">
            <Archive />
          </button>
          <button type="reset">Cancel</button>
          <button type="submit">Save Note</button>
        </div>
      </div>
      <div></div>
      <TextArea
        error={fieldErrors?.content}
        name="content"
        placeholder="Start typing your note here..."
      />
      {isSuccess && <p>Note saved.</p>}
    </form>
  );
}
