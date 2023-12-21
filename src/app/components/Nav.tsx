"use client";
import { Flex, Link, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return (
    <Flex
      className="h-screen w-40 pt-20"
      position="fixed"
      direction="column"
      align="center"
      justify="between"
    >
      <Flex direction="column" width="100%" align="center" gap="2" px="2">
        <Link
          href="/"
          className={`no-underline w-full ${
            pathname === "/" ? "bg-blue-500 text-white" : ""
          } text-center p-2 hover:text-white hover:bg-blue-500`}
          size="2"
        >
          当前查询
        </Link>
        <Link
          href="/profile"
          className={`no-underline w-full ${
            pathname === "/profile" ? "bg-blue-500 text-white" : ""
          } text-center p-2 hover:text-white hover:bg-blue-500`}
          size="2"
        >
          用户信息
        </Link>
        <Link
          href="/history"
          className={`no-underline w-full ${
            pathname === "/history" ? "bg-blue-500 text-white" : ""
          } text-center p-2 hover:text-white hover:bg-blue-500`}
          size="2"
        >
          历史查询
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
