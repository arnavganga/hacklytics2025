"use client";
import { StytchProvider as ProviderActual } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/dist/index.ui";
import { ReactNode } from "react";
console.log(createStytchUIClient);

// Initialize the Stytch client using the public token from environment variables
console.log("Stytch Public Token:", process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN);
const stytch = createStytchUIClient(process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || "");
console.log("Stytch Public Token:", stytch);
console.log("Stytch Project Id:", process.env.STYTCH_PROJECT_ID);


const StytchProvider = ({ children }) => {
  return <ProviderActual stytch={stytch}>{children}</ProviderActual>;
};

export default StytchProvider;
