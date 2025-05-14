"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStytchUser, useStytch } from "@stytch/nextjs";

const MAGIC_LINKS_TOKEN = "magic_links";

/**
 * During the Magic link flow, Stytch will redirect the user back to your application to a specified redirect URL (see Login.tsx).
 * Stytch will append query parameters to the redirect URL which are then used to complete the authentication flow.
 * A redirect URL for this example app will look something like: http://localhost:3000/authenticate?stytch_token_type=magic_links&token=abc123
 *
 * The AuthenticatePage will detect the presence of a token in the query parameters, and attempt to authenticate it.
 *
 * On successful authentication, a session will be created and the user will be redirect to /profile.
 */
const Authenticate = () => {
  const { user, isInitialized } = useStytchUser();
  const stytch = useStytch();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (stytch && !user && isInitialized) {
      const token = searchParams.get("token");
      const stytch_token_type = searchParams.get("stytch_token_type");

      console.log("Token:", token);
      console.log("Stytch Token Type:", stytch_token_type);

      if (token && stytch_token_type === MAGIC_LINKS_TOKEN) {
        stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        });
      }
    }
  }, [isInitialized, router, searchParams, stytch, user]);

  useEffect(async () => {
    if (!isInitialized) {
      return;
    }
    if (user) {
      const email = user?.emails[0]?.email;
      try {
        const res = await fetch("http://localhost:3000/api/patients/getUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (data == null) {
          console.log("User not found");
          router.push("/signup/patient");
        } else {
          localStorage.setItem("id", email);
          localStorage.setItem("user-type", data.role);

          if (data.role === "doctor") {
            router.push("/dashboard/doctor");
          }
          if (data.role === "patient") {
            router.push("/dashboard/patient");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [router, user, isInitialized]);

  return null;
};

export default Authenticate;
