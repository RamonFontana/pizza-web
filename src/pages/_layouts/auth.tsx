import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="gird-cols-2 grid min-h-screen">
      <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground"></div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
