import { Table, Link, Button } from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getChemicalSVG } from "@/utils/api";
import { TrashIcon } from "@heroicons/react/24/outline";

const SingleRoute: React.FC<any> = ({ route, onDelete }) => {
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    const updateSvg = async () => {
      const res = await getChemicalSVG(route.target);
      if (res !== null) {
        const svgUrl = `data:image/svg+xml,${encodeURIComponent(res)}`;
        setTarget(svgUrl);
      }
    };
    updateSvg();
    // eslint-disable-next-line
  }, []);
  return (
    <Table.Row>
      <Table.RowHeaderCell>{route.id}</Table.RowHeaderCell>
      <Table.Cell>{route.time_stamp.substring(0, 10)}</Table.Cell>
      <Table.Cell>
        <Link href={`/history/${route.id}`}>
          {target && (
            <Image
              src={target}
              alt="target"
              width={70}
              height={70}
              className="bg-white rounded-md p-2 hover:bg-yellow-300"
            />
          )}
        </Link>
      </Table.Cell>
      <Table.Cell>
        <TrashIcon
          width="27"
          color="teal"
          onClick={() => onDelete(route.id)}
          className="hover:cursor-pointer hover:text-red-500"
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default SingleRoute;
