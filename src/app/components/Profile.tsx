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
        <DropdownMenu.Item shortcut='⌘ E' onClick={onProfile}>Edit</DropdownMenu.Item>
        <DropdownMenu.Item shortcut='⌘ D'>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut='⌘ N'>Archive</DropdownMenu.Item>

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
            <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />
        <DropdownMenu.Item>Share</DropdownMenu.Item>
        <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut='⌘ ⌫' color='red'>
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default Profile
