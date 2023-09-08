import { Box, Button, Image, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { useEffect } from "react";
import { AddIcon, SmallAddIcon } from "@chakra-ui/icons";
import ChatLoading from "../components/ChatLoading";
import { getSender, getSenderImage } from "../config/ChatsLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/chat`,
        config
      );

      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                display="flex"
                gap="3"
                alignItems="center"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Box display="flex" alignItems="center" justifyItems="center">
                  {!chat.isGroupChat ? (
                    <Image
                      borderRadius="full"
                      boxSize="40px"
                      src={getSenderImage(user, chat.users)}
                      alt={getSender(user, chat.users)}
                    />
                  ) : (
                    <Image
                      borderRadius="full"
                      boxSize="40px"
                      padding="0.5"
                      src={chat.groupImage}
                      alt={chat.chatName.toUpperCase()}
                    />
                  )}
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize="lg">
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  <Text fontSize="sm">
                    {chat.latestMessage ? chat.latestMessage.content : ""}
                  </Text>
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
