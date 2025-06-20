import type { Metadata } from "next";
import "./globals.css";
import { ReactFlowProvider } from "@xyflow/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NodeDetailsProvider } from "@/contexts/NodeDetailsContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SidebarProvider
        defaultOpen={false}
      >
        <NodeDetailsProvider>
          <ReactFlowProvider>
            <body
              className={` antialiased bg-blue-500`}
            >
              {children}
            </body>
          </ReactFlowProvider>
        </NodeDetailsProvider>
      </SidebarProvider>
    </html>
  );
}
