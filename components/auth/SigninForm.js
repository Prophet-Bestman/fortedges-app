import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AuthCard from "./AuthCard";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { MdOutlineErrorOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signupSchema } from "utils";
import Link from "next/link";

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
    resolver: yupResolver(signupSchema),
  });
  const onSubmit = (data) => console.log(data);
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

          <Button type="submit" w="full">
            Sign In
          </Button>
        </form>
      </AuthCard>

      <Text textAlign="center" color="white" display="flex" gap="4px">
        Already have a Fortedges account?{" "}
        <Link href="#">
          <Text cursor="pointer" fontWeight="600">
            Log in
          </Text>
        </Link>
      </Text>
    </Box>
  );
};

export default SigninForm;
