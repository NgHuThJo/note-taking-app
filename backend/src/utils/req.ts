import type { Request } from "express";

export function getCookie(request: Request) {
  return (
    request.headers.cookie
      ?.split(";")
      .reduce<Record<string, string>>((prev, current) => {
        const [key, value] = current.trim().split("=");

        return { ...prev, [key]: value };
      }, {}) ?? {}
  );
}
