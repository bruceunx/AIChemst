import { Flex, Heading, Link, Text } from '@radix-ui/themes'

export default function Header() {
	return (
		<Flex
			direction='row'
			height='8'
			width='100%'
			position='fixed'
			align='center'
			justify='between'
			p='2'
			style={{ backgroundColor: 'var(--gray-a7)' }}
		>
			<Heading>AI辅助合成设计</Heading>
			<Link size='2'>用户登陆</Link>
		</Flex>
	)
}
