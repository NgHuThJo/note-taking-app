import { Outlet } from "react-router";
import { MainLayout } from "#frontend/components/layouts/main/main";
import { PageLayout } from "#frontend/components/layouts/page/page";

export function AppRoot() {
  return (
    <PageLayout>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </PageLayout>
  );
}
