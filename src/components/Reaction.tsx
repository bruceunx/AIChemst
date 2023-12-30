import { RadioGroup, Table } from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getReactionSVG } from "../utils/api";

const Reaction: React.FC<any> = ({ route, target, idx }) => {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    const updateSvg = async () => {
      const res = await getReactionSVG(route.outcome, target);
      if (res === null) {
        console.log("error from svg fetching");
      } else {
        const svgUrl = `data:image/svg+xml,${encodeURIComponent(res)}`;
        setSvg(svgUrl);
      }
    };
    updateSvg();
    // eslint-disable-next-line
  }, []);

  return (
    <Table.Row className='w-full h-36'>
      <Table.RowHeaderCell>{route.plausibility.toFixed(4)}</Table.RowHeaderCell>
      <Table.Cell>
        {svg && (
          <Image
            src={svg}
            alt="reaction1"
            width={800}
            height={200}
            className="bg-green-50 rounded-xl p-2"
          />
        )}
      </Table.Cell>
      <Table.Cell>
        <RadioGroup.Item value={idx} />
      </Table.Cell>
    </Table.Row>
  );
};

export default Reaction;
