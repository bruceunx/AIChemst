import { MouseEvent, useEffect, useState } from "react";
import { DropdownMenu, Button } from "@radix-ui/themes";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useCurrentLocale } from "next-i18n-router/client";
import i18nConfig from "../../i18nConfig";
import { useRouter } from "next/navigation";

const Profile = () => {
  const locale = useCurrentLocale(i18nConfig);
  const router = useRouter();
  const [lang, setLang] = useState("中文");

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    setLang(target.textContent || "中文");
    if (target.textContent === "中文") {
      router.push("/");
    } else {
      router.push("/en");
    }
  };

  useEffect(() => {
    if (locale === "en") {
      setLang("English");
    } else {
      setLang("中文");
    }
  }, [locale]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" className="outline-none">
          {lang}
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={onClick} className="outline-none">
          中文
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={onClick} className="outline-none">
          English
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Profile;
