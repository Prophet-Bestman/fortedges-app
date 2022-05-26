import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineErrorOutline } from "react-icons/md";

import { config, signinSchema } from "utils";
import { useLogIn } from "api/auth";
import AuthCard from "components/auth/AuthCard";
import { AuthContext, userActions } from "providers/AuthProvider";
import VerifyAdminLogin from "./VerifyAdminLogin";

const AdminSigninForm = () => {
  const [show, setShow] = useState(false);
  const [loginObj, setLoginObj] = useState({});

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

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const loginErrorToast = () => {
    toast({
      title: "Login Error",
      description: "An error occured, try again later",
      status: "error",
      duration: 4000,
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
    setLoginObj(data);
    login(data);
  };

  useEffect(() => {
    if (!!error) {
      if (error.message === "Request failed with status code 400") {
        // inValidCredentialsToast();
        loginErrorToast();
      } else if (
        error.message === "Request failed with status code 404" ||
        error.message === "Request failed with status code 500"
      ) {
        inValidCredentialsToast();
        // loginErrorToast();
      }
    }
  }, [error]);

  useEffect(() => {
    if (!loginData) {
    }
    if (loginData === "Two-factor authentication code sent") {
      onOpen();
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
      backdropBlur="2xl"
    >
      <Text fontSize={[24, , 28, 32]} color="white" fontWeight="600">
        Sign in to Fortedges Admin
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

      {isOpen && (
        <VerifyAdminLogin
          isOpen={isOpen}
          onClose={onClose}
          payload={loginObj}
        />
      )}
    </Box>
  );
};

export default AdminSigninForm;
