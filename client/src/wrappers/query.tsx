"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";

const queryClient = new QueryClient();

export default function Query({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ConnectKitProvider theme="retro"
       customTheme={{
        "--ck-overlay-background": "#2832f74f",
        "--ck-overlay-backdrop-filter":"blur(0px)",
        "--ck-body-background":"#c9ccff",
        
      }}
      >{children}</ConnectKitProvider>;
    </QueryClientProvider>
  );
}
 
