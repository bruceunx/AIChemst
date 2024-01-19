import { MouseEvent, useState } from "react";
import { DropdownMenu, Button } from "@radix-ui/themes";
import { CaretDownIcon } from "@radix-ui/react-icons";

const Profile = () => {
  const [lang, setLang] = useState("中文");

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    setLang(target.textContent || "中文");
  };
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
