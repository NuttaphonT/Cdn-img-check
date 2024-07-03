import { atom } from "jotai";

export const ROP2E_ITEM_IMG_URL = "https://cdn.maxion.gg/landverse/image/item";
export const ROP2E_COLLECTION_IMG_URL =
  "https://cdn.maxion.gg/landverse/image/collection";
export const ROP2E_MAP_IMG_URL = "https://cdn.maxion.gg/landverse/image/map";
export const ROP2E_MONSTER_IMG_URL =
  "https://cdn.maxion.gg/landverse/image/monster";

  export const sIndex = atom<any[]>([])
  export const sJsonItem = atom<any[]>([])
  export const sLoading = atom<boolean>(false)