'use client'
import { Button, Flex, Link, TextField } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

export default function Search() {
	return (
		<Flex direction='row' justify='center' gap='2' align='center' p='2'>
			<TextField.Root className='w-64'>
				<TextField.Slot>
					<MagnifyingGlassIcon height='16' width='16' />
				</TextField.Slot>
				<TextField.Input placeholder='输入产品名称或者SMILES来查询' />
			</TextField.Root>
			<Button>开始查询</Button>
			<Link
				size='2'
				href='https://www.rcsb.org/chemical-sketch'
				target='_blank'
			>
				👉按结构图查询SMILES
			</Link>
		</Flex>
	)
}
