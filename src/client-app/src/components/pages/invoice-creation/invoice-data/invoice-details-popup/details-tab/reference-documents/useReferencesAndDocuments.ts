import { ColDef } from '@grc/ui-package';
import { useI18nState } from '../../../../../../stores/settings/language-context';
import { IReferenceAndDocuments } from '../../../../../../models/invoice-creation/invoice-details-popup/details-tab/references-documents.interface';

export default function useReferenceAndDocuments() {
  const { localeData } = useI18nState();
  const referencesAndDocumentsDefs: ColDef<IReferenceAndDocuments>[] = [
    {
      headerName: localeData.ReferenceType,
      field: 'referenceType',
      sortable: true,
      flex: 1.3
    },
    {
      headerName: localeData.ReferenceNo,
      field: 'referenceNumber',
      sortable: true,
      flex: 1
    },
    {
      headerName: localeData.UploadDocumentPicture,
      field: 'document.documentName',
      sortable: true,
      flex: 2
    }
  ];

  return {
    referencesAndDocumentsDefs
  };
}
