"use client";
import { Flex, Link, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return (
    <Flex
      className="h-screen w-48 pt-20"
      position="fixed"
      direction="column"
      align="center"
      justify="between"
    >
      <Flex direction="column" width="100%" align="center" gap="2" px="2">
        <Link
          href="/"
          className={`no-underline w-full rounded-full ${
            pathname === "/" ? "bg-blue-500 text-white" : "hover:bg-gray-500"
          } text-center p-2 hover:text-white`}
          size="2"
        >
          当前查询
        </Link>
        <Link
          href="/profile"
          className={`no-underline w-full rounded-full ${
            pathname === "/profile"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-500"
          } text-center p-2 hover:text-white `}
          size="2"
        >
          用户信息
        </Link>
        <Link
          href="/history"
          className={`no-underline w-full rounded-full ${
            pathname === "/history"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-500"
          } text-center p-2 hover:text-white `}
          size="2"
        >
          历史查询
        </Link>
        <Link
          href="/help"
          className={`no-underline w-full rounded-full ${
            pathname === "/help"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-500"
          } text-center p-2 hover:text-white `}
          size="2"
        >
          帮助说明
        </Link>
      </Flex>
      <Flex direction="column">
        <Text size="1" color="ruby">
          wx: labnetworks
        </Text>
        <Text size="1" color="blue">
          辅助功能开发中
        </Text>
      </Flex>
    </Flex>
  );
}
