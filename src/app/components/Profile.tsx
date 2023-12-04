import { DropdownMenu, Button } from '@radix-ui/themes'
import { CaretDownIcon, PersonIcon } from '@radix-ui/react-icons'

const Profile = () => {

  const onProfile = () => {
    console.log('toggle profile')
  }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant='soft'>
          <PersonIcon />
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item shortcut='⌘ E' onClick={onProfile}>菜单1</DropdownMenu.Item>
        <DropdownMenu.Item shortcut='⌘ D'>菜单2</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut='⌘ N'>菜单3</DropdownMenu.Item>

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>更多</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
            <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default Profile
