import { FormEvent } from "react";
import { Link } from "react-router";
import { trpc } from "#frontend/lib/trpc";
import { colorSchema } from "#shared/types/settings";
import { Sun, Moon } from "#frontend/components/ui/image/icon/icon";
import { useColorThemeStore } from "#frontend/providers/color-theme";

const themeArray = [
  {
    label: "Light Mode",
    value: "light",
    description: "Pick a clean and classic light theme",
    icon: <Sun />,
  },
  {
    label: "Dark Mode",
    value: "dark",
    description: "Select a sleek and modern dark theme",
    icon: <Moon />,
  },
];

export function ColorSettings() {
  const { mutate } = trpc.settings.updateColorTheme.useMutation();
  const setTheme = useColorThemeStore((state) => state.setTheme);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));
    const parsedData = colorSchema.safeParse(formData);

    if (!parsedData.success) {
      return;
    }

    mutate(parsedData.data, {
      onSuccess: () => {
        setTheme(parsedData.data.theme);
      },
      onError: (error) => {
        console.error("Backend error:", error.message);
      },
    });
  };

  return (
    <div>
      <Link to="..">Settings</Link>
      <h1>Color Theme</h1>
      <p>Choose your color theme</p>
      <form onSubmit={handleSubmit}>
        {themeArray.map(({ label, description, icon, value }) => (
          <label htmlFor={value} key={label}>
            <div>{icon}</div>
            <div>
              <h2>{label}</h2>
              <p>{description}</p>
            </div>
            <input type="radio" name="theme" id={value} value={value} />
          </label>
        ))}
        <button type="submit">Apply Changes</button>
      </form>
    </div>
  );
}
