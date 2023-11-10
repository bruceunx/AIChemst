import { Button, Dialog, Flex } from '@radix-ui/themes'
import { StandaloneStructServiceProvider } from 'ketcher-standalone'
import { Editor } from 'ketcher-react'

import 'ketcher-react/dist/index.css'

const structServiceProvider = new StandaloneStructServiceProvider()

declare global {
  var ketcher: any
}

const ChemEditor: React.FC<any> = ({ setInput }) => {
  const onClick = async () => {
    const smiles = await global.ketcher.getSmiles()
    setInput(smiles)
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>👉按结构图查询</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ minWidth: '1200px' }}>
        <Editor
          errorHandler={() => {}}
          staticResourcesUrl={''}
          structServiceProvider={structServiceProvider}
          onInit={async (ketcher) => {
            global.ketcher = ketcher
            ketcher.setMolecule('')
          }}
        />
        <Flex gap='3' mt='4' justify='end'>
          <Dialog.Close>
            <Button variant='soft' color='gray'>
              取消
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={onClick}>查询</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default ChemEditor
