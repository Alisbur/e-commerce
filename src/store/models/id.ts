export type TIdApi = {
  id: number;
  documentId: string;
};

export type TIdModel = {
  id: number;
  documentId: string;
};

export const normalizeId = (from: TIdApi): TIdModel => ({
  id: from.id,
  documentId: from.documentId,
});
