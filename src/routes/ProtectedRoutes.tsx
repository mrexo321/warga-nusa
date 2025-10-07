// src/routes/ProtectedRoute.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";
import { toast } from "sonner";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { role, token } = useSelector((state: RootState) => state.user);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      toast.error("Anda harus login terlebih dahulu!");
      setRedirectTo("/login");
    } else if (allowedRoles && !allowedRoles.includes(role || "")) {
      toast.warning("Anda tidak memiliki akses ke halaman ini!");
      setRedirectTo("/");
    }
  }, [token, role, allowedRoles]);

  if (redirectTo) return <Navigate to={redirectTo} replace />;

  return <Outlet />;
}
