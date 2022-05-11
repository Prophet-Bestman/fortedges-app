import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useUpdateUser } from "api/user";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const UploadProfilePhoto = ({ isOpen, onClose }) => {
  const [selectedFile, setSelctedFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [POPImg, setPOPImg] = useState(null);
  const filePickerRef = useRef(null);
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Successful",
      description: "Profile Photo Updated",
      status: "success",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const errorToast = () => {
    toast({
      title: "Error",
      description: uploadError,
      status: "error",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const addImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelctedFile(readerEvent.target.result);
    };
    setPOPImg(e.target.files[0]);
  };

  const { mutate: uploadPhoto, isLoading, data: uploadResp } = useUpdateUser();

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("display_picture", POPImg);

    uploadPhoto(formData);
  };

  useEffect(() => {
    if (!!uploadResp) {
      if (Object.keys(uploadResp).length > 0) {
        successToast();
        onClose();
      } else {
        setUploadError("Couldn't update Profile Photo");
      }
    }
  }, [uploadResp]);

  useEffect(() => {
    if (!!uploadError && uploadError !== "") {
      errorToast();
    }
  }, [uploadError]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent py="30px" px="24px">
        <Text fontSize="24px" fontWeight={600} textAlign="center">
          Upload Profile Photo
        </Text>

        {!!selectedFile ? (
          <Flex flexDir="column" alignItems="center" my="60px">
            <Image
              mb="16px"
              src={selectedFile}
              h="300px"
              w="full"
              objectFit="contain"
            />

            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setPOPImg(null);
                setSelctedFile(null);
              }}
            >
              Change Photo
            </Button>

            <Button
              isDisabled={!selectedFile || POPImg?.size > 505000}
              mt="30px"
              isLoading={isLoading}
              onClick={handleUpload}
            >
              Upload Photo
            </Button>

            {POPImg?.size > 505000 && (
              <Text
                color="red"
                fontSize="13px"
                fontWeight={600}
                textAlign="center"
              >
                Uploaded Image must be less than 500KB
              </Text>
            )}
          </Flex>
        ) : (
          <Flex
            cursor="pointer"
            justify="center"
            alignItems="center"
            my="60px"
            h="300px"
            bg="gray.200"
            onClick={() => filePickerRef.current.click()}
          >
            <Input
              type="file"
              ref={filePickerRef}
              hidden
              accept=".jpg, .jpeg, .png"
              onChange={addImg}
            />
            <AiOutlinePlus size="90px" color="gray" />
          </Flex>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UploadProfilePhoto;
