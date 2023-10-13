import { Flex, Link } from '@radix-ui/themes'

export default function Nav() {
	return (
		<Flex
			className='h-screen w-28'
			mt='8'
			p='2'
			pt='5'
			position='fixed'
			direction='column'
			align='center'
			gap='2'
			style={{ backgroundColor: 'var(--gray-a6)' }}
		>
			<Link>当前查询</Link>
			<Link>历史查询</Link>
		</Flex>
	)
}
