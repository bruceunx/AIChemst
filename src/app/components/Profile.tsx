import { DropdownMenu, Button } from "@radix-ui/themes";
import { CaretDownIcon, PersonIcon } from "@radix-ui/react-icons";

const Profile = () => {
  const onProfile = () => {
    console.log("toggle profile");
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft">
          <PersonIcon />
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item shortcut="⌘ E" onClick={onProfile}>
          用户名
        </DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘ D">邮箱</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌘ N">改密码</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Profile;
