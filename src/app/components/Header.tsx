"use client";
import { Flex, Heading, Button } from "@radix-ui/themes";
import { ExitIcon } from "@radix-ui/react-icons";
import Profile from "./Profile";
import { useAuth } from "../auth/AutoWrapper";
import { redirect } from "next/navigation";

export default function Header() {
  const { logout } = useAuth();
  const onExit = () => {
    logout();
    return redirect("/");
  };

  return (
    <Flex
      direction="row"
      width="100%"
      className="h-18"
      position="fixed"
      align="center"
      justify="between"
      p="3"
      top="0"
    >
      <Heading size="5" align="center" color="gray" className="pl-5">
        AI Retrosynthesis
      </Heading>

      <Flex gap="1">
        <Profile />
        <Button
          variant="soft"
          onClick={onExit}
          className="hover: cursor-pointer"
        >
          <ExitIcon />
        </Button>
      </Flex>
    </Flex>
  );
}
