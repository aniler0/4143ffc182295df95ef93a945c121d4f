import type { IFish } from "@/types/fish";
import type { TableColumnType } from "ant-design-vue";

export const TABLE_COLUNMNS:TableColumnType<IFish>[] = [
  {
    title: 'Fish Name',
    dataIndex: 'name',
    key: 'name',
    width: '15%',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: '15%',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
    width: '10%',
  },
  {
    title: 'Last Feed',
    dataIndex: 'lastFeed',
    key: 'lastFeed',
    width: '15%',
  },
  {
    title: 'Health',
    dataIndex: 'health',
    key: 'health',
    width: '10%',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    width: '15%',
  },
]
