"use client";
import { Flex, Text, Heading } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCurrentLocale } from "next-i18n-router/client";
import i18nConfig from "../../../../i18nConfig";

export default function Profile() {
  const locale = useCurrentLocale(i18nConfig);

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      if (locale === "en") {
        redirect("/en/login");
      } else {
        redirect("/login");
      }
    },
  });

  if (status === "loading") {
    return (
      <Flex className="m-auto">
        <Text>Loading....</Text>
      </Flex>
    );
  }

  console.log(session);

  return (
    <Flex
      className="w-1/2 mx-auto m-7 p-2 rounded-xl border-solid border-2 border-gray-500"
      direction="column"
      gap="4"
    >
      <Heading align="center">
        {locale === "en" ? "Profile" : "用户信息"}
      </Heading>
      <Text>{locale === "en" ? "username" : "用户名"}: {session.user?.name}</Text>
    </Flex>
  );
}
