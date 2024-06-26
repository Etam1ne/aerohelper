export type DocumentInfoType = {
  checked: boolean;
  date?: string;
};

export type DocumentPersonInfoType = Record<string, DocumentInfoType>;

export type ParentInfoType = {
  childName: string;
  flightDate: string;
};
