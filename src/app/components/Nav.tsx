"use client";
import { Flex, Link, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

export default function Nav() {

  const pathname = usePathname();
  return (
    <Flex
      className="h-[95vh] w-32"
      mt="8"
      pt="5"
      position="fixed"
      direction="column"
      align="center"
      justify="between"
      style={{ backgroundColor: "var(--gray-a6)" }}
    >
      <Flex direction="column" width="100%" align="center" px="1">
        <Link
          href="/"
          className={`no-underline w-full ${
            pathname === "/" ? "bg-teal-600 text-white" : ""
          } text-center p-2 rounded-md hover:text-white hover:bg-teal-600`}
          size="2"
        >
          当前查询
        </Link>
        <Link
          href="/profile"
          className={`no-underline w-full ${
            pathname === "/profile" ? "bg-teal-600 text-white" : ""
          } text-center p-2 rounded-md hover:text-white hover:bg-teal-600`}
          size="2"
        >
          用户信息
        </Link>
        <Link
          href="/history"
          className={`no-underline w-full ${
            pathname === "/history" ? "bg-teal-600 text-white" : ""
          } text-center p-2 rounded-md hover:text-white hover:bg-teal-600`}
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
