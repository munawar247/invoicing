import { AgGridReact, DomLayout, GrcGrid, gridOptions } from '@grc/ui-package';
import { useRef } from 'react';
import { useI18nState } from '../../../../../../stores/settings/language-context';
import useReferenceAndDocuments from './useReferencesAndDocuments';
import { IReferenceAndDocumentDetails } from './reference-documents.interface';

import './references-and-documents.scss';

export default function ReferenceDocuments(
  props: IReferenceAndDocumentDetails
) {
  const { localeData } = useI18nState();
  const gridRef = useRef<AgGridReact>(null);
  const { referencesAndDocumentsDefs } = useReferenceAndDocuments();
  return (
    <>
      <label className="grc-card-title">
        {localeData.ReferencesAndDocuments}
      </label>
      <div className="main-div-reference-and-documents p-2 pt-2">
        <GrcGrid
          gridRef={gridRef}
          gridOptions={gridOptions}
          colDefs={referencesAndDocumentsDefs}
          domLayout={DomLayout.AutoHeight}
          rowData={props.referenceAndDocument}
        />
      </div>
    </>
  );
}
