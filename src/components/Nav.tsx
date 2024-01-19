"use client";
import { Flex, Link, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { useCurrentLocale } from "next-i18n-router/client";
import i18nConfig from "../../i18nConfig";
import { useEffect, useState } from "react";

export default function Nav() {
  const locale = useCurrentLocale(i18nConfig);

  const [data, setData] = useState<string[][]>([]);

  useEffect(() => {
    let zhData = [
      ["当前查询", "/"],
      ["用户信息", "/profile"],
      ["历史查询", "/history"],
      ["帮助说明", "/help"],
    ];
    let enData = [
      ["Retrosynthesis", "/en"],
      ["Profile", "/en/profile"],
      ["Records", "/en/history"],
      ["Help", "/en/help"],
    ];
    if (locale === "en") {
      setData(enData);
    } else {
      setData(zhData);
    }
  }, [locale]);

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
        {data.map((item, idx) => (
          <Link
            key={idx}
            href={item[1]}
            className={`no-underline w-full rounded-full ${
              pathname === item[1]
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-500"
            } text-center p-2 hover:text-white`}
            size="2"
          >
            {item[0]}
          </Link>
        ))}
      </Flex>
      <Flex direction="column" p="2">
        <Text size="1" color="teal">
          wx: labnetworks
        </Text>
        <Text size="1" color="blue">
          bruceunx(at)outlook.com
        </Text>
      </Flex>
    </Flex>
  );
}
