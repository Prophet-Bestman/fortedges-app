import {
  Box,
  Button,
  Circle,
  Flex,
  Progress,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { AiFillCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import { useGetMops } from "api/mop";
import { CreateMOP } from "components/admin/CreateMop";
import { EditMOP } from "components/admin/EditMop";

const Mop = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);
  const [copied, setCopied] = React.useState("");
  const [mops, setMops] = useState([]);
  const [selectedMOP, setSelectedMOP] = useState(null);

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.modeOfPayment,
    });
  }, []);

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const handleCopy = (mop) => {
    navigator.clipboard.writeText(mop.address);
    setCopied(mop.type);
    setTimeout(() => {
      setCopied("false");
    }, 2000);
  };

  const handleEdit = (mop) => {
    setSelectedMOP(mop);
    onEditOpen();
  };

  // ============ GET MOPS LOGIC ==============

  const { data: mopsData, isLoading } = useGetMops();

  useEffect(() => {
    if (mopsData !== undefined && mopsData?.length > 0) setMops(mopsData);
  }, [mopsData]);

  return (
    <Box px={"24px"} py="40px" color="text.black">
      <Text fontSize={"34px"} fontWeight="600" mb="12">
        M.O.P
      </Text>

      <Circle
        justifyContent="center"
        alignItems="center"
        size="28px"
        bg="app.primary"
        color="white"
        cursor={"pointer"}
      >
        <AiOutlinePlus size="20px" onClick={onCreateOpen} />
      </Circle>

      {isLoading ? (
        <Progress isIndeterminate colorScheme="gray" my="12" />
      ) : (
        mops?.map((mop, i) => {
          return (
            <Box
              key={i}
              my="12"
              bg="white"
              w={["320px", , "370px"]}
              p="24px"
              mb="40px"
            >
              <Flex justify="space-between" w="full" pb="24px">
                <Text textTransform="uppercase">{mop?.type} Address</Text>
                <Button
                  onClick={() => handleEdit(mop)}
                  w="auto"
                  variant="link"
                  color="app.primary"
                >
                  Edit
                </Button>
              </Flex>

              {mop?.address !== undefined && (
                <Flex justify="space-between" alignItems="center" gap="12px">
                  <Text fontWeight="600" overflow="hidden" isTruncated>
                    {mop?.address || ""}
                  </Text>

                  {copied === mop?.type ? (
                    <AiFillCheckCircle size="24px" />
                  ) : (
                    <BiCopy
                      size="20px"
                      onClick={() => handleCopy(btcDetails)}
                      cursor="pointer"
                    />
                  )}
                </Flex>
              )}
            </Box>
          );
        })
      )}
      {/* <Box bg="white" w={["320px", , "370px"]} p="24px">
        <Flex justify="space-between" w="full" pb="24px">
          <Text>ETH Address</Text>
          <Button
            w="auto"
            variant="link"
            color="app.primary"
            onClick={onETHOpen}
          >
            Edit
          </Button>
        </Flex>

        {ethDetials?.address !== undefined && (
          <Flex justify="space-between" alignItems="center" gap="12px">
            <Text fontWeight="600" overflow="hidden" isTruncated>
              {ethDetials?.address || ""}
            </Text>

            {copied === ethDetials?.type ? (
              <AiFillCheckCircle size="24px" />
            ) : (
              <BiCopy
                size="20px"
                onClick={() => handleCopy(ethDetials)}
                cursor="pointer"
              />
            )}
          </Flex>
        )}
      </Box> */}
      {/* <EditBTC isOpen={isBTCOpen} onClose={onBTCClose} mop={btcDetails} />
      <EditETH isOpen={isETHOpen} onClose={onETHClose} mop={ethDetials} /> */}
      {isCreateOpen && (
        <CreateMOP isOpen={isCreateOpen} onClose={onCreateClose} />
      )}
      {isEditOpen && !!selectedMOP && (
        <EditMOP isOpen={isEditOpen} onClose={onEditClose} mop={selectedMOP} />
      )}
    </Box>
  );
};

export default Mop;

Mop.isAdmin = true;
