import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import AuthCard from "./AuthCard";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { MdOutlineErrorOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { config, signinSchema } from "utils";
import Link from "next/link";
import { useLogIn } from "api/auth";
import { useRouter } from "next/router";

const SigninForm = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const router = useRouter();
  const toast = useToast();

  const inValidCredentialsToast = () => {
    toast({
      title: "Invalid Email or Password",
      description: "Check your login details and try again",
      status: "error",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };
  const successToast = () => {
    toast({
      title: "Logged In",
      description: "Redirecting to dashboard...",
      status: "success",
      duration: 1000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  // ======= SIGN UP LOGIC ==========
  const { mutate: login, isLoading, data: loginData, error } = useLogIn();

  const onSubmit = (data) => {
    data = {
      email: data.email,
      password: data.password,
      device: {},
    };
    console.log(data);
    login(data);
  };

  useEffect(() => {
    if (error) {
      if ((error.message = "Request failed with status code 400"))
        inValidCredentialsToast();
    }
  }, [error]);

  useEffect(() => {
    if (!loginData) {
    }
    if (loginData?.user) {
      const user = config.key.user;
      const token = config.key.token;
      const wallet = config.key.wallet;
      const userID = config.key.userID;
      const result = JSON.stringify(loginData.user);
      const walletData = JSON.stringify(loginData.wallet);
      localStorage.clear();
      localStorage.setItem(user, result);
      localStorage.setItem(token, loginData.user.access_token);
      localStorage.setItem(wallet, walletData);
      localStorage.setItem(userID, loginData.user._id);
      successToast();
      // router.push("/");
      router.push(`/`);
    }
  }, [loginData]);

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
        Sign in to Fortedges
      </Text>
      <AuthCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb="24px">
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
            <InputGroup>
              <Input
                {...register("password")}
                type={show ? "text" : "password"}
                placeholder="Choose Password"
                variant={errors.password ? "error" : "outline"}
              />

              <InputRightElement onClick={handleShow}>
                <Box fontSize="24px" color="text.grey">
                  {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </Box>
              </InputRightElement>
            </InputGroup>
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
                <MdOutlineErrorOutline color="red" /> {errors.password.message}
              </Text>
            )}
          </Box>

          <Button isLoading={isLoading} type="submit" w="full">
            Sign In
          </Button>
        </form>
      </AuthCard>

      <Box textAlign="center" color="white" display="flex" gap="12px">
        <Link href="/auth/forgotpassword">
          <Text cursor="pointer" fontWeight="500">
            Forgot Password?
          </Text>
        </Link>
        <Link href="/auth/signup">
          <Text cursor="pointer" fontWeight="500">
            {"Don't have an account?"}
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default SigninForm;
