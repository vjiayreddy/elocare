import RootComponent from "@/components/Common/Utils/Root/RootComponent";
import ThemeProvider from "@/theme/muiThemeProvider";
import type { Metadata } from "next";
import { ReduxStateProviders } from "@/redux/provider";
import NextAuthSessionProvider from "./api/auth/[...nextauth]/providers/sessionProvider";

export const metadata: Metadata = {
  title: "elocare",
  description: "Powered by elocare",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ReduxStateProviders>
          <NextAuthSessionProvider>
            <ThemeProvider>
              <RootComponent>{children}</RootComponent>
            </ThemeProvider>
          </NextAuthSessionProvider>
        </ReduxStateProviders>
      </body>
    </html>
  );
}
