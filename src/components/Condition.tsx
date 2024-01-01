import { RadioGroup, Table } from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getChemicalSVG } from "@/utils/api";

const Condition: React.FC<any> = ({ condition, idx }) => {
  const [reagent, setReagent] = useState<string | null>(null);
  const [solvent, setSolvent] = useState<string | null>(null);
  const [catalyst, setCatalyst] = useState<string | null>(null);

  useEffect(() => {
    const updateSvg = async () => {
      if (condition.reagent.length > 0) {
        const res = await getChemicalSVG(condition.reagent);
        if (res !== null) {
          const svgUrl = `data:image/svg+xml,${encodeURIComponent(res)}`;
          setReagent(svgUrl);
        }
      }
      if (condition.solvent.length > 0) {
        const res = await getChemicalSVG(condition.solvent);
        if (res !== null) {
          const svgUrl = `data:image/svg+xml,${encodeURIComponent(res)}`;
          setSolvent(svgUrl);
        }
      }
      if (condition.catalyst.length > 0) {
        const res = await getChemicalSVG(condition.catalyst);
        if (res !== null) {
          const svgUrl = `data:image/svg+xml,${encodeURIComponent(res)}`;
          setCatalyst(svgUrl);
        }
      }
    };
    updateSvg();
    // eslint-disable-next-line
  }, []);
  return (
    <Table.Row className="w-full">
      <Table.RowHeaderCell>{condition.score.toFixed(4)}</Table.RowHeaderCell>
      <Table.Cell>
        {reagent && (
          <Image
            src={reagent}
            alt="reagent"
            width={70}
            height={70}
            className="bg-white rounded-full p-2"
          />
        )}
      </Table.Cell>
      <Table.Cell>
        {solvent && (
          <Image
            src={solvent}
            alt="solvent"
            width={70}
            height={70}
            className="bg-white rounded-full p-2"
          />
        )}
      </Table.Cell>
      <Table.Cell>
        {catalyst && (
          <Image
            src={catalyst}
            alt="catalyst"
            width={70}
            height={70}
            className="bg-white rounded-full p-2"
          />
        )}
      </Table.Cell>
      <Table.Cell>{condition.temperature.toFixed(3)}</Table.Cell>
      <Table.Cell>
        <RadioGroup.Item value={idx + 1} />
      </Table.Cell>
    </Table.Row>
  );
};

export default Condition;
