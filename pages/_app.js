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
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CSSReset />
        {Component.requireAuth ? (
          <NavProvider>
            <MainLayout>
              <PlanFormProvider>
                <GoalFormProvider>
                  <Component {...pageProps} />
                </GoalFormProvider>
              </PlanFormProvider>
            </MainLayout>
          </NavProvider>
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
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
