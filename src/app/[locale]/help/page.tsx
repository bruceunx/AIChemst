import { Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";

const Help = () => {
  return (
    <Flex direction="column" align="center" p="2" gap="2">
      <Heading align="center">帮助说明</Heading>
      <Flex align="start" direction="column" gap="3">
        <Text>1 正常输入Smiles来查询合成路线, 可以画出结构图来查询</Text>
        <Text>2 如果输入名称，请用标准命名的化合物名称来查询</Text>
        <Text>
          3 历史查询需要注册用户才能使用， 可以使用测试账户test:test123来测试
        </Text>
        <Text>4 可以查询反应路线和反应条件</Text>
        <Text>5 反应路线图包含化合物节点（显示结构图)， 和反应节点</Text>
        <Text>
          6 编辑反应路线可以选择 <strong>反应节点</strong>，
          按Del键来删除部分反应路线
        </Text>
        <Text>7 多使用几次，就熟悉了:)</Text>
      </Flex>
      <Heading align="center">离线单机版AIChemist(windows)</Heading>

      <Flex
        align="center"
        justify="center"
        direction="row"
        width="100%"
        gap="5"
        mb="7"
      >
        <Image
          src="/Screenshot1.png"
          alt="aichemist"
          width="600"
          height="500"
        />
        <Image
          src="/Screenshot2.png"
          alt="aichemist"
          width="600"
          height="500"
        />
      </Flex>
      <Text>联系邮箱发送软件(1G): bruceunx@outlook.com</Text>
    </Flex>
  );
};

export default Help;