import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import React from "react";
import theme from "../theme";
import "@fontsource/dm-sans";
import "@fontsource/coustard";
import NavProvider from "providers/NavProvider";
import { AuthLayout, MainLayout } from "components/layouts";
import PlanFormProvider from "providers/PlanFormProvider";
import GoalFormProvider from "providers/GoalFormProvider";
import AdminLayout from "components/layouts/AdminLayout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SuccessModalProvider from "providers/SuccessModalProvider";
import AuthProvider from "providers/AuthProvider";
import AuthGuard from "providers/AuthGuard";

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <CSSReset />
            {Component.requireAuth ? (
              <AuthGuard>
                <NavProvider>
                  <MainLayout>
                    <SuccessModalProvider>
                      <PlanFormProvider>
                        <GoalFormProvider>
                          <Component {...pageProps} />
                        </GoalFormProvider>
                      </PlanFormProvider>
                    </SuccessModalProvider>
                  </MainLayout>
                </NavProvider>
              </AuthGuard>
            ) : Component.isAdmin ? (
              <NavProvider>
                <AdminLayout>
                  <PlanFormProvider>
                    <GoalFormProvider>
                      <Component {...pageProps} />
                    </GoalFormProvider>
                  </PlanFormProvider>
                </AdminLayout>
              </NavProvider>
            ) : (
              <AuthLayout>
                <Component {...pageProps} />
              </AuthLayout>
            )}
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
