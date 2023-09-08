import {
  Box,
  Button,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import React from "react";
import { useState } from "react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [name, setName] = useState();
  // const [email, setEmail] = useState();

  // console.log(name, email);

  // const updateUser=()=>{


  // }

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}

      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="300px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            gap="3"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="120px"
              src={user.image}
              alt={user.name}
            />
            <Box width="100%" display="flex" flexDir="column" gap="5">
              <Text
                fontSize={{ base: "10px", md: "20px" }}
                fontFamily={"Work sans"}
                display="flex"
                alignItems="center"
              >
                Name:{user.name}
                {/* <Input
                  height="2rem"
                  placeholder={user.name}
                  onChange={(e) => setName(e.target.value)}
                /> */}
              </Text>
              <Text
                fontSize={{ base: "10px", md: "20px" }}
                fontFamily={"Work sans"}
                display="flex"
                alignItems="center"
              >
                Email: {user.email}
                {/* <Input
                  height="2rem"
                  placeholder={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                /> */}
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            {/* <Button
              colorScheme="blue"
              mr={3}
              onClick={updateUser}
              hidden={name || email ? false : true}
            >
              Apply
            </Button> */}
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
