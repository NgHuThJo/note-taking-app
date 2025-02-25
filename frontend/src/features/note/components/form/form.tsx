import { FormEvent, useState } from "react";
import { Link } from "react-router";
import { FormErrorMessage } from "#frontend/components/ui/form/message/error";
import { Input } from "#frontend/components/ui/form/input/input";
import { TextArea } from "#frontend/components/ui/form/textarea/textarea";
import { trpc } from "#frontend/lib/trpc";
import { SchemaError } from "#frontend/types/zod";
import { noteSchema } from "#shared/types/note";
import { Archive, Bin } from "#frontend/components/ui/image/icon/icon";

export function NoteForm() {
  const [fieldErrors, setFieldErrors] = useState<
    SchemaError<typeof noteSchema>
  >({});
  const { mutate, isSuccess, isPending, error } =
    trpc.note.createNote.useMutation();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));
    const parsedData = noteSchema.safeParse(formData);

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
          <button type="reset">Cancel</button>
          <button type="submit">Save Note</button>
        </div>
      </div>
      <div>
        <input type="text" name="title" placeholder="Enter a title..." />
        {fieldErrors?.title && <FormErrorMessage error={fieldErrors.title} />}
        <div>
          <Input
            type="text"
            name="tags"
            placeholder="Add tags separated by commas (e.g. work, planning)"
            error={fieldErrors?.tags}
          />
        </div>
      </div>
      <TextArea
        error={fieldErrors?.content}
        name="content"
        placeholder="Start typing your note here..."
      />
      {isSuccess && <p>Note saved.</p>}
    </form>
  );
}
