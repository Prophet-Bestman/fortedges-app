import { Box, Grid, Progress, Text } from "@chakra-ui/react";
import { useGetAllPlans, useGetCustomPlans } from "api/plans";
import { Padding } from "components/layouts";
import { AuthContext } from "providers/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import UpgradePlanCard from "./UpgradePlanCard";

const UpgradePlan = () => {
  const [higherPlans, setHigherPlans] = useState([]);
  const { user } = useContext(AuthContext);
  const { data: plansResp, isLoading } = useGetAllPlans();
  const { data: customPlansResp, isLoading: loadingCustom } =
    useGetCustomPlans();

  useEffect(() => {
    if (plansResp?.length > 0 && customPlansResp?.custom_plans?.length > 0) {
      const currentPlanIdx = plansResp.findIndex(
        (plan) =>
          plan?.name?.toLowerCase() ===
          customPlansResp?.custom_plans[0]?.name?.toLowerCase()
      );
      const higherPlans = plansResp?.slice(currentPlanIdx + 1);
      setHigherPlans(plansResp);
    }
  }, [plansResp, customPlansResp]);

  return (
    <Padding>
      <Box my="64px">
        {higherPlans?.length > 0 && (
          <Box>
            <Text
              borderBottomWidth="1px"
              borderBottomColor="#E7E8ED"
              fontSize="16px"
              pb="4"
            >
              You can earn more
            </Text>

            <Grid
              templateColumns={[
                "repeat(1, 1fr)",
                ,
                "repeat(3, 1fr)",
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
              ]}
              my="4"
              gap="4"
            >
              {isLoading || loadingCustom ? (
                <Progress size="sm" isIndeterminate colorScheme="gray" />
              ) : (
                higherPlans?.length > 0 &&
                higherPlans?.map((plan) => (
                  <UpgradePlanCard
                    key={plan?.id}
                    plan={plan}
                    customPlan={customPlansResp?.custom_plans[0]}
                  />
                ))
              )}
            </Grid>
          </Box>
        )}
      </Box>
    </Padding>
  );
};

export default UpgradePlan;
