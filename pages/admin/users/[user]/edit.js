import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useAdminGetUser, useAdminUpdateUser } from "api/user";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineErrorOutline } from "react-icons/md";
import { editUserSchema } from "utils/schemas";

const Edit = () => {
  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [updateError, setUpdateError] = useState({});
  const [userID, setUserID] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editUserSchema),
  });

  const router = useRouter();
  const query = router.query;

  const toast = useToast();
  const successToast = () => {
    toast({
      title: "User Updated",
      description: "You have updated this user successfully",
      status: "success",
      duration: 1000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const ErrorToast = () => {
    toast({
      title: "Update Error",
      description: "Error occured while updating this user",
      status: "error",
      duration: 1000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  useEffect(() => {
    setUserID("");
  }, []);

  useEffect(() => {
    if (!!query) {
      setUserID(query.user);
    }
  }, [query]);

  // ======== User details logic ======
  const { data: userData } = useAdminGetUser(userID);

  useEffect(() => {
    if (!!userData && Object.keys(userData).length > 0) {
      setUser(userData);
    }
  }, [userData]);

  // =============== UPDATE USER LOGIC ===========

  const { mutate: update, data: updateResp, isLoading } = useAdminUpdateUser();

  const submit = (data) => {
    const payload = {
      user_id: userID,
      data: {
        firstname: data.firstName,
        lastname: data.lastName,
        display_name: data.displayName,
        dob: data.dob || user?.dob?.slice(0, 10),
        phone_number: data.phoneNumber,
        nationality: data.nationality,
      },
    };

    update(payload);
  };

  useEffect(() => {
    if (!!updateResp && updateResp.status === 200) {
      if (updateResp !== updatedUser) {
        setUpdatedUser(updateResp);
      }
    } else if (
      updateResp === 400 ||
      (updateResp?.toString()?.includes("Request Failed with status") &&
        updateResp !== updateError)
    ) {
      setUpdateError(updateResp);
      ErrorToast();
    }
  }, [updateResp]);

  useEffect(() => {
    if (!!updatedUser && updatedUser.status === 200) {
      successToast();
    }
  }, [updatedUser]);

  return (
    <Box px="24px" py="40px" color="text.black">
      <form onSubmit={handleSubmit(submit)}>
        <Flex gap="40px">
          <Circle size="80px" bg="gray.400"></Circle>
          <Box w="full">
            <Grid templateColumns="repeat(2, 1fr)" gap="40px">
              <GridItem colSpan={1}>
                <Stack mb="24px">
                  <Text fontWeight={600}>First Name</Text>
                  <Input
                    bg="white"
                    type="text"
                    w-full
                    {...register("firstName")}
                    defaultValue={user?.firstname}
                    variant={errors.firstName && "error"}
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
                      {errors.firstName.message}
                    </Text>
                  )}
                </Stack>
                <Stack mb="24px">
                  <Text fontWeight={600}>Display Name</Text>
                  <Input
                    bg="white"
                    type="text"
                    w-full
                    {...register("displayName")}
                    defaultValue={user?.display_name}
                    variant={errors.displayName && "error"}
                  />
                  {errors.displayName && (
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
                      {errors.displayName.message}
                    </Text>
                  )}
                </Stack>
                {/* <Stack mb="24px">
                  <Text fontWeight={600}>Phone Number</Text>
                  <Input
                    bg="white"
                    type="number"
                    w-full
                    {...register("phoneNumber")}
                    defaultValue={user?.phone_number}
                    variant={errors.phoneNumber && "error"}
                  />
                {errors.phoneNumber && (
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
                    {errors.phoneNumber.message}
                  </Text>
                )}
                </Stack> */}
                <Stack mb="24px">
                  <Text fontWeight={600}>Date of Birth</Text>
                  <Input
                    bg="white"
                    type="date"
                    w-full
                    {...register("dob")}
                    defaultValue={user?.dob?.slice(0, 10)}
                    variant={errors.dob && "error"}
                  />
                </Stack>
                {errors.dob && (
                  <Text
                    py="8px"
                    textTransform="capitalize"
                    fontSize="12px"
                    color="red"
                    display="flex"
                    alignItems="center"
                    gap="4px"
                  >
                    <MdOutlineErrorOutline color="red" /> {errors.dob.message}
                  </Text>
                )}
              </GridItem>
              <GridItem colSpan={1}>
                <Stack mb="24px">
                  <Text fontWeight={600}>Last Name</Text>
                  <Input
                    bg="white"
                    type="text"
                    w-full
                    {...register("lastName")}
                    defaultValue={user?.lastname}
                    variant={errors.lastName && "error"}
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
                      {errors.lastName.message}
                    </Text>
                  )}
                </Stack>
                <Stack mb="24px">
                  <Text fontWeight={600}>Email Address</Text>
                  <Input
                    bg="white"
                    type="email"
                    w-full
                    {...register("email")}
                    defaultValue={user?.email}
                    variant={errors.email && "error"}
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
                      <MdOutlineErrorOutline color="red" />{" "}
                      {errors.email.message}
                    </Text>
                  )}
                </Stack>
                {/* <Stack mb="24px">
                  <Text fontWeight={600}>Nationality</Text>
                  <Input
                    bg="white"
                    type="text"
                    w-full
                    {...register("nationality")}
                    defaultValue={user?.middlename}
                    variant={errors.nationality && "error"}
                  />
                  {errors.nationality && (
                    <Text
                      py="8px"
                      textTransform="capitalize"
                      fontSize="12px"
                      color="red"
                      display="flex"
                      alignItems="center"
                      gap="4px"
                    >
                      <MdOutlineErrorOutline color="red" />
                      {errors.nationality.message}
                    </Text>
                  )}
                </Stack> */}
              </GridItem>
              <GridItem></GridItem>
            </Grid>
          </Box>

          <Flex w="400px" justifyContent="end">
            <Button type="submit" size="sm" isLoading={isLoading}>
              Save
            </Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default Edit;

Edit.isAdmin = true;
