import {
  Avatar,
  Box,
  Button,
  Circle,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  SelectField,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useGetUser, useUpdateUser } from "api/user";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { personalInfoSchema, profileSchema } from "utils/schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validatePersonalInfo, validateProfile } from "utils/validation";
import { MdOutlineErrorOutline } from "react-icons/md";
import { getUserFromLocalStorage } from "api/config";
import UploadProfilePhoto from "./UploadProfilePhoto";
import ControlledInput from "components/ControlledInput";
import { Country, State, City } from "country-state-city";
import { AuthContext } from "providers/AuthProvider";

const ProfileTab = () => {
  const { user } = useContext(AuthContext);
  const [credError, setCredError] = useState("");
  const [countries, setCountries] = useState([]);
  // const []
  const toast = useToast();

  useEffect(() => {
    setCountries(Country.getAllCountries());
    setValue("country", user?.address?.country);
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
  });
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    control: control2,
    reset: reset2,
    setValue,
  } = useForm({
    resolver: yupResolver(personalInfoSchema),
    defaultValues: {
      country: user?.address?.country,
    },
  });

  // const { data: userData } = useGetUser();
  const {
    mutate: updateUserProfile,
    isLoading,
    error: updateUserProfileError,
    data: userData,
  } = useUpdateUser();

  const {
    mutate: updateUserProfile2,
    isLoading: isLoading2,
    error: updateUserProfileError2,
    data: userData2,
  } = useUpdateUser();

  // ================= TOASTS ====================

  const handleSuccessToast = useCallback(
    (message) => {
      toast({
        title: message,
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );
  const handleErrorsToast = useCallback(
    (message) => {
      toast({
        title: message,
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );

  // ================= SUBMIT PROFILE DETAILS LOGIC =============

  const submitProfile = (data) => {
    const profileDetails = {
      display_name: data.display_name,
      email: data.email,
    };
    let builder = {};
    validateProfile(builder, user, profileDetails, setCredError);

    if (Object.keys(builder).length !== 0) {
      updateUserProfile(builder);
    }
  };

  const submitProfile2 = (data) => {
    let builder = { address: {} };

    validatePersonalInfo(builder, user, data, setCredError);

    if (Object.keys(builder).length !== 0) {
      updateUserProfile2(builder);
    }
  };

  useEffect(() => {
    if (userData != undefined) {
      // setUser(userData);
      handleSuccessToast("Profile Updated");
    }
  }, [userData]);

  useEffect(() => {
    if (userData2 != undefined) {
      // setUser(userData2);
      handleSuccessToast("Profile Updated");
    }
  }, [userData2]);

  useEffect(() => {
    if (!!credError) {
      // setUser(credError);
      handleErrorsToast(credError);
    }
  }, [credError]);

  return (
    <Box>
      <Flex mb="32px" alignItems="center">
        {/* <Circle size="64px" bgColor="#aaa" mr="24px"></Circle> */}
        <Avatar
          mr="24px"
          src={user?.display_picture?.path}
          size="lg"
          name={`${user?.firstname} ${user?.lastname}`}
        />
        <Box color="text.black" mr="32px">
          <Text fontWeight={600}>Change Picture</Text>
          <Text fontSize="14px">Max file size is 20mb</Text>
        </Box>
        <Button variant="secondary" size="xs" onClick={onOpen}>
          Upload
        </Button>
      </Flex>

      <Text fontSize={["20px", , "24px"]} color="tex.black" fontWeight={600}>
        My Profile
      </Text>

      {/* Profile  */}

      <Box my="48px">
        <form onSubmit={handleSubmit(submitProfile)}>
          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            maxW={"527px"}
            gap="3"
          >
            <GridItem>
              <Stack mb="32px">
                <FormLabel m="0" color="text.grey" fontSize="14px">
                  First name
                </FormLabel>
                <Input
                  // inputType={"input"}
                  h={["48px", , "56px"]}
                  // placeholder="First Name"
                  type="text"
                  w="full"
                  // name="firstname"
                  // control={control}
                  {...register("firstname")}
                  defaultValue={user.firstname}
                  variant={errors.firstname ? "error" : "outline"}
                />
                {errors.firstname && (
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
                    {errors.firstname.message}
                  </Text>
                )}
              </Stack>
            </GridItem>
            <GridItem>
              <Stack mb="32px">
                <FormLabel m="0" color="text.grey" fontSize="14px">
                  Last name
                </FormLabel>
                <Input
                  // inputType={"input"}
                  h={["48px", , "56px"]}
                  // placeholder="Last Name"
                  type="text"
                  w="full"
                  maxW={"527px"}
                  // name="lastname"
                  // control={control}
                  {...register("lastname")}
                  defaultValue={user.lastname}
                  variant={errors.lastname ? "error" : "outline"}
                />
                {errors.lastname && (
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
                    {errors.lastname.message}
                  </Text>
                )}
              </Stack>
            </GridItem>
          </Grid>
          <Stack mb="32px">
            <FormLabel m="0" color="text.grey" fontSize="14px">
              Email Address
            </FormLabel>
            <Input
              // inputType={"input"}
              h={["48px", , "56px"]}
              placeholder="email@address.com"
              type="email"
              w="full"
              maxW={"527px"}
              // name="email"
              // control={control}
              {...register("email")}
              defaultValue={user.email}
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
                <MdOutlineErrorOutline color="red" /> {errors.email.message}
              </Text>
            )}
          </Stack>

          <Button type="submit" size="sm" isLoading={isLoading}>
            Save
          </Button>
        </form>
      </Box>

      {/* ============== Personal Information ==============  */}

      <Box my="48px">
        <form onSubmit={handleSubmit2(submitProfile2)}>
          <Box>
            <Stack mb="32px">
              <FormLabel m="0" color="text.grey" fontSize="14px">
                Date Of Birth
              </FormLabel>
              <Flex gap="12px" w="full" maxW={"527px"}>
                <Input
                  type="date"
                  {...register2("dob")}
                  defaultValue={user?.dob?.slice(0, 10)}
                  variant={errors2.dob ? "error" : "outline"}
                />
              </Flex>
              {errors2.dob && (
                <Text
                  py="8px"
                  textTransform="capitalize"
                  fontSize="12px"
                  color="red"
                  display="flex"
                  alignItems="center"
                  gap="4px"
                >
                  <MdOutlineErrorOutline color="red" /> {errors2.dob.message}
                </Text>
              )}
            </Stack>
            <Stack mb="32px" w="full" maxW={"527px"}>
              <FormLabel m="0" color="text.grey" fontSize="14px">
                Country
              </FormLabel>

              <ControlledInput
                h={["48px", , "56px"]}
                placeholder="Select a country"
                // defaultValue={user?.address?.country}
                name="country"
                control={control2}
                inputType="select"
                variant={errors2.country ? "error" : "outline"}
              >
                {countries?.length > 0 &&
                  countries.map((country) => (
                    <option key={country.isoCode}>{country.name}</option>
                  ))}
              </ControlledInput>
              {errors2.country && (
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
                  {errors2.country.message}
                </Text>
              )}
            </Stack>

            <Flex gap="12px" w="full" maxW={"527px"}>
              <Stack mb="32px" w="full">
                <FormLabel m="0" color="text.grey" fontSize="14px">
                  City/Town
                </FormLabel>
                <Input
                  h={["48px", , "56px"]}
                  placeholder="California"
                  type="text"
                  w="full"
                  defaultValue={user?.address?.city}
                  {...register2("city")}
                  variant={errors2.city ? "error" : "outline"}
                />
                {errors2.city && (
                  <Text
                    py="8px"
                    textTransform="capitalize"
                    fontSize="12px"
                    color="red"
                    display="flex"
                    alignItems="center"
                    gap="4px"
                    variant={errors2.city ? "error" : "outline"}
                  >
                    <MdOutlineErrorOutline color="red" /> {errors2.city.message}
                  </Text>
                )}
              </Stack>
              <Stack mb="32px" w="full">
                <FormLabel m="0" color="text.grey" fontSize="14px">
                  State
                </FormLabel>
                <Input
                  h={["48px", , "56px"]}
                  placeholder="Los Angeles"
                  type="text"
                  w="full"
                  defaultValue={user?.address?.state}
                  {...register2("state")}
                  variant={errors2.state ? "error" : "outline"}
                />
                {errors2.state && (
                  <Text
                    py="8px"
                    textTransform="capitalize"
                    fontSize="12px"
                    color="red"
                    display="flex"
                    alignItems="center"
                    gap="4px"
                    variant={errors2.state ? "error" : "outline"}
                  >
                    <MdOutlineErrorOutline color="red" />{" "}
                    {errors2.state.message}
                  </Text>
                )}
              </Stack>
            </Flex>
          </Box>

          <Button isLoading={isLoading2} type="submit" size="sm">
            Save
          </Button>
        </form>
      </Box>
      <UploadProfilePhoto isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ProfileTab;
