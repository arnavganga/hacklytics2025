"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component, allowedRole) {
  return function AuthenticatedPage(props) {
    const router = useRouter();

    useEffect(() => {
      const email = localStorage.getItem("email");
      const userType = localStorage.getItem("user-type");

      if (!email || !userType) {
        router.push("/login"); // not logged in
      }

      const roles = Array.isArray(allowedRole) ? allowedRole : [allowedRole];

      if (allowedRole && !roles.includes(userType)) {
        router.push("/"); // wrong role push to home page
      }
    }, []);

    return <Component {...props} />;
  };
}
