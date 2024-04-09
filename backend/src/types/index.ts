export type trashDataType = {
  id: number;
  binId: string;
  trashType: "recyclable" | "trash" | "glass";
  createdAt: string;
  updatedAt: string;
};

export type BinInfo = {
  id: string;
  createdAt: Date;
  mostTypeTrash: string;
  totalTrash: number;
}

export type trashStatsType = {
  trashData: trashDataType[];
  totalTrash: number;
  stats: {
    totalTrashByBin: { [binId: string]: number };
    totalTrashByType: { recyclable: number; trash: number; glass: number };
    bins: BinInfo[]
  };
};

export type TrashType = "recyclable" | "trash" | "glass";

export type Trash = {
  id: number;
  binId: string;
  trashType: TrashType;
  createdAt: Date;
  updatedAt: Date;
}

export type Stats = {
  totalTrashByBin: { [binId: string]: number };
  totalTrashByType: { [trashType: string]: number };
  bins: BinInfo[]
}