export type DocumentInfoType = {
  checked: boolean;
  date?: string;
};

export type DocumentPersonInfoType = Record<string, DocumentInfoType>;
