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
import React, { useRef, useState } from "react";
import { BiCheck } from "react-icons/bi";
import {
  AiOutlineClose,
  AiOutlineCamera,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import IDSuccess from "./IDSuccess";

const IdPageTwo = ({ setIDPage, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelctedFile] = useState(null);
  const [selectedFileTwo, setSelctedFileTwo] = useState(null);
  const filePickerRef = useRef(null);
  const filePickerRefTwo = useRef(null);

  const prev = () => {
    setIDPage(1);
  };

  const addImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelctedFile(readerEvent.target.result);
    };
  };
  const addImgTwo = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelctedFileTwo(readerEvent.target.result);
    };
  };

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
          </Box>

          <Button
            disabled={!selectedFile || !selectedFileTwo}
            // disabled
            my="24px"
            w="full"
            onClick={onOpen}
          >
            Continue
          </Button>
        </Box>
      </Box>
      <IDSuccess onClose={onClose} isOpen={isOpen} />
    </Box>
  );
};

export default IdPageTwo;
