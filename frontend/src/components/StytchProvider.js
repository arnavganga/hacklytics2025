"use client";
import { StytchProvider as ProviderActual } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/dist/index.ui";
import { ReactNode } from "react";

// Initialize the Stytch client using the public token from environment variables
const stytch = createStytchUIClient(process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || "");

const StytchProvider = ({ children }) => {
  return <ProviderActual stytch={stytch}>{children}</ProviderActual>;
};

export default StytchProvider;
