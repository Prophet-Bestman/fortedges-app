import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Input,
  position,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import AuthCard from "./AuthCard";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { MdOutlineErrorOutline } from "react-icons/md";
import { signupSchema } from "../../utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSignUp } from "api/auth";
import config from "utils/config";
import { process.env.NEXT_PUBLIC_LANDING_URL } from "api/process.env.NEXT_PUBLIC_BASE_URLs";

const SignupForm = () => {
  const [canSubmit, setCanSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const router = useRouter();

  const toast = useToast();
  const errorToast = () => {
    toast({
      title: "Sign Up Error",
      description: "This email is already taken",
      status: "error",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };
  const successToast = () => {
    toast({
      title: "Sign Up Successful",
      description: "Sending you a confirmation email...",
      status: "success",
      duration: 2000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  // ======= SIGN UP LOGIC ==========
  const { mutate: signUp, isLoading, data: signUpData, error } = useSignUp();

  const onSubmit = (data) => {
    data = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      password: data.password,
      device: {},
    };
    signUp(data);
  };

  useEffect(() => {
    if (error) {
      if ((error.message = "Request failed with status code 409")) errorToast();
    }
  }, [error]);

  useEffect(() => {
    if (!signUpData) {
    }
    if (signUpData?.user) {
      const user = config.key.user;
      const token = config.key.token;
      const wallet = config.key.wallet;
      const userID = config.key.userID;
      const result = JSON.stringify(signUpData.user);
      const walletData = JSON.stringify(signUpData.wallet);
      localStorage.clear();
      localStorage.setItem(user, result);
      localStorage.setItem(token, signUpData.user.access_token);
      localStorage.setItem(wallet, walletData);
      localStorage.setItem(userID, signUpData.user._id);
      successToast();
      router.push(`/auth/verify/?email=${signUpData.user.email}`);
    }
  }, [signUpData]);

  return (
    <Box
      w="full"
      display="flex"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      my="80px"
    >
      <Text fontSize={[24, , 28, 32]} color="white" fontWeight="600">
        Create your account
      </Text>
      <AuthCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text mb="24px" color="text.grey" textAlign="center">
            Required fields have an asterisk: *
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap="16px" mb="24px">
            <GridItem>
              <Text fontWeight="600" fontSize="14px" mb="4px">
                First name *
              </Text>
              <Input
                {...register("firstName")}
                type="text"
                placeholder="First name"
                variant={errors.firstName ? "error" : "outline"}
              />
              {errors.firstName && (
                <Text
                  py="8px"
                  textTransform="capitalize"
                  fontSize="12px"
                  color="red"
                  display="flex"
                  alignItems="center"
                  gap="4px"
                >
                  <MdOutlineErrorOutline color="red" />{" "}
                  {errors.firstName.message}{" "}
                </Text>
              )}
            </GridItem>
            <GridItem>
              <Text fontWeight="600" fontSize="14px" mb="4px">
                Last name *
              </Text>
              <Input
                {...register("lastName")}
                type="text"
                placeholder="Last name"
                variant={errors.lastName ? "error" : "outline"}
              />
              {errors.lastName && (
                <Text
                  py="8px"
                  textTransform="capitalize"
                  fontSize="12px"
                  color="red"
                  display="flex"
                  alignItems="center"
                  gap="4px"
                >
                  <MdOutlineErrorOutline color="red" />{" "}
                  {errors.lastName.message}{" "}
                </Text>
              )}
            </GridItem>
          </Grid>
          <Box mb="24px">
            <Text
              {...register("email")}
              fontWeight="600"
              fontSize="14px"
              mb="4px"
            >
              Email *
            </Text>
            <Input
              {...register("email")}
              type="email"
              placeholder="Email"
              variant={errors.email ? "error" : "outline"}
            />
            {errors.email && (
              <Text
                py="8px"
                textTransform="capitalize"
                fontSize="12px"
                color="red"
                display="flex"
                alignItems="center"
                gap="4px"
              >
                <MdOutlineErrorOutline color="red" /> {errors.email.message}{" "}
              </Text>
            )}
          </Box>
          <Box mb="24px">
            <Text fontWeight="600" fontSize="14px" mb="4px">
              Password *
            </Text>
            <Input
              {...register("password")}
              type="password"
              placeholder="Choose Password"
              variant={errors.password ? "error" : "outline"}
            />
            {errors.password && (
              <Text
                py="8px"
                textTransform="capitalize"
                fontSize="12px"
                color="red"
                display="flex"
                alignItems="center"
                gap="4px"
              >
                <MdOutlineErrorOutline color="red" /> {errors.password.message}{" "}
              </Text>
            )}
          </Box>
          <Box display="flex" mb="32px">
            <Checkbox
              onChange={() => setCanSubmit(!canSubmit)}
              mr="12px"
              size="lg"
            ></Checkbox>
            <Text>
              I certify that I am 18years of age or older, and agree to the{" "}
              <Box display="inline" color="app.primary">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={process.env.NEXT_PUBLIC_LANDING_URL + "/terms"}
                >
                  User Agreement
                </a>{" "}
              </Box>
              and{" "}
              <Box display="inline" color="app.primary">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={process.env.NEXT_PUBLIC_LANDING_URL + "/terms"}
                >
                  Privacy Policy
                </a>
              </Box>
            </Text>
          </Box>

          <Button
            isLoading={isLoading}
            disabled={!canSubmit}
            type="submit"
            w="full"
          >
            Create Account
          </Button>
        </form>
      </AuthCard>

      <Text textAlign="center" color="white" display="flex" gap="4px">
        Already have a Ubassets account?{" "}
        <Link href="/auth/signin">
          <Text cursor="pointer" fontWeight="600">
            Log in
          </Text>
        </Link>
      </Text>
    </Box>
  );
};

export default SignupForm;
