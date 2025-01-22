export interface IReferenceAndDocuments {
  referenceId: string;
  referenceTypeId: string;
  referenceType: string;
  referenceNumber: string;
  document: IDocument;
}

export interface IDocument {
  documentId: string;
  documentContent: string; 
  documentType: string;
  documentName: string;
}
