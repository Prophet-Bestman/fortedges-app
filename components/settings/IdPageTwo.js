import {
  Box,
  Circle,
  Flex,
  Image,
  Text,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import {
  AiOutlineClose,
  AiOutlineCamera,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import IDSuccess from "./IDSuccess";
import { useVerifyID } from "api/verification";
import ErrorModal from "components/ErrorModal";

const IdPageTwo = ({ setIDPage, title, type }) => {
  const [selectedFile, setSelctedFile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();
  const [selectedFileTwo, setSelctedFileTwo] = useState(null);
  const filePickerRef = useRef(null);
  const filePickerRefTwo = useRef(null);
  const [uploadedImg, setUploadedImg] = useState();
  const [uploadedImgTwo, setUploadedImgTwo] = useState();
  // const {isOpen, onOpen} = useDisclosure()

  const prev = () => {
    setIDPage(1);
  };

  const { mutate: verifyID, isLoading, data: verifiedData } = useVerifyID();

  const addImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelctedFile(readerEvent.target.result);
    };
    setUploadedImg(e.target.files[0]);
  };
  const addImgTwo = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelctedFileTwo(readerEvent.target.result);
    };
    setUploadedImgTwo(e.target.files[0]);
  };

  const submitID = () => {
    const ID = new FormData();
    ID.append("front", uploadedImg);
    ID.append("back", uploadedImgTwo);
    ID.append("type", type);

    verifyID(ID);
  };

  useEffect(() => {
    if (verifiedData !== undefined) {
      if (verifiedData === 409) {
        onErrorOpen();
      } else {
        onOpen();
      }
    }
  }, [verifiedData]);

  return (
    <Box mb="40px">
      <Circle
        onClick={prev}
        cursor="pointer"
        my="40px"
        size="40px"
        bg="#7950DA0D"
      >
        <AiOutlineArrowLeft />
      </Circle>

      <Box>
        <Text fontSize="16px" fontWeight="600">
          {title}
        </Text>

        <Box color="text.black" my="48px">
          <Flex alignItems="center" gap="12px" mb="12px">
            <BiCheck color="green" />
            <Text color="text.grey" fontSize="14px">
              Government-issued
            </Text>
          </Flex>
          <Flex alignItems="center" gap="12px" mb="12px">
            <BiCheck color="green" />
            <Text color="text.grey" fontSize="14px">
              Original full-size, unedited documents
            </Text>
          </Flex>
          <Flex alignItems="center" gap="12px" mb="12px">
            <BiCheck color="green" />
            <Text color="text.grey" fontSize="14px">
              Place documents against a single-coloured backgorund
            </Text>
          </Flex>
          <Flex alignItems="center" gap="12px" mb="12px">
            <BiCheck color="green" />
            <Text color="text.grey" fontSize="14px">
              Readable, well-lit, coloured images
            </Text>
          </Flex>
          <Flex alignItems="center" gap="12px" mb="12px">
            <AiOutlineClose color="red" />
            <Text color="text.grey" fontSize="14px">
              No black and white images
            </Text>
          </Flex>
          <Flex alignItems="center" gap="12px" mb="12px">
            <AiOutlineClose color="red" />
            <Text color="text.grey" fontSize="14px">
              No edited or expired documents
            </Text>
          </Flex>
        </Box>

        <Box>
          <Text fontWeight={600} fontSize="14px">
            File size must be between 10kb and 5120kb
          </Text>

          {/* UPLOAD FRONT COVER */}
          <Box>
            {selectedFile ? (
              <Box>
                <Image
                  w="full"
                  h="280px"
                  objectFit="contain"
                  src={selectedFile}
                  bg="#F6F6F6"
                  p="20px"
                />

                <Flex justify="center">
                  <Button
                    mt="14px"
                    onClick={() => setSelctedFile(null)}
                    size="sx"
                    py="4px"
                    px="12px"
                  >
                    Change Photo
                  </Button>
                </Flex>
              </Box>
            ) : (
              <Flex
                my="16px"
                bg="#F6F6F6"
                h="144px"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                color="app.primary"
                cursor="pointer"
                onClick={() => filePickerRef.current.click()}
              >
                <Input
                  type="file"
                  ref={filePickerRef}
                  hidden
                  accept=".jpg, .jpeg, .png"
                  onChange={addImg}
                />
                <AiOutlineCamera size={"30px"} />
                <Text fontWeight={600} fontSize="14px" mt="8px">
                  Upload front cover
                </Text>
              </Flex>
            )}

            {uploadedImg?.size > 5705000 && (
              <Text
                fontSize="14px"
                textAlign="center"
                color="red.500"
                fontWeight={600}
                my="20px"
              >{`Image must be between 10KB to 5120KB (5MB)`}</Text>
            )}
          </Box>

          {/* UPLOAD BACK COVER */}
          <Box>
            {selectedFileTwo ? (
              <Box>
                <Image
                  w="full"
                  h="280px"
                  objectFit="contain"
                  src={selectedFileTwo}
                  bg="#F6F6F6"
                  p="20px"
                />

                <Flex justify="center">
                  <Button
                    mt={"14px"}
                    onClick={() => setSelctedFileTwo(null)}
                    size="sx"
                    py="4px"
                    px="12px"
                  >
                    Change Photo
                  </Button>
                </Flex>
              </Box>
            ) : (
              <Flex
                my="16px"
                bg="#F6F6F6"
                h="144px"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                color="app.primary"
                cursor="pointer"
                onClick={() => filePickerRefTwo.current.click()}
              >
                <Input
                  type="file"
                  ref={filePickerRefTwo}
                  hidden
                  accept=".jpg, .jpeg, .png"
                  onChange={addImgTwo}
                />
                <AiOutlineCamera size={"30px"} />
                <Text fontWeight={600} fontSize="14px" mt="8px">
                  Upload back cover
                </Text>
              </Flex>
            )}

            {uploadedImgTwo?.size > 5705000 && (
              <Text
                fontSize="14px"
                textAlign="center"
                color="red.500"
                fontWeight={600}
                mt="20px"
              >{`Image must be between 10KB to 5120KB (5MB)`}</Text>
            )}
          </Box>

          <Button
            isLoading={isLoading}
            my="24px"
            w="full"
            onClick={submitID}
            disabled={
              !selectedFile ||
              !selectedFileTwo ||
              uploadedImg?.size > 5705000 ||
              uploadedImgTwo?.size > 5705000
            }
          >
            Continue
          </Button>

          {(uploadedImg?.size > 5705000 || uploadedImgTwo?.size > 5705000) && (
            <Text>{`Image must be between 10KB to 5120KB (5MB)`}</Text>
          )}
        </Box>
      </Box>
      <IDSuccess onClose={onClose} isOpen={isOpen} />
      <ErrorModal
        onClose={onErrorClose}
        isOpen={isErrorOpen}
        msg={`An ID has already been submitted.
      Await Confirmation
      `}
      />
    </Box>
  );
};

export default IdPageTwo;
