"use client";
import { Flex, Text, Heading } from "@radix-ui/themes";
import { useAuth } from "../auth/AutoWrapper";
import { redirect } from "next/navigation";

export default function Profile() {
  const { user } = useAuth();

  if (user === null) {
    return redirect("/");
  }

  return (
    <Flex
      className="w-1/2 mx-auto m-7 p-2 rounded-xl border-solid border-2 border-blue-500"
      direction="column"
      gap="4"
    >
      <Heading align="center">个人信息</Heading>
      <Text>邮箱: </Text>
      <Text>其他信息: </Text>
    </Flex>
  );
}
