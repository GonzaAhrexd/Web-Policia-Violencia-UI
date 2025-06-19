// Contexto

import { useCampos } from '../../context/campos';
import DataTable from 'react-data-table-component';
import { customStyles } from '../../GlobalConst/customStyles';
import columnsTablaDivisiones from './columnsTablaDivisiones'
import expandedComponentsUnidades from './expandedComponentsUnidades'
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

function TablaUnidades() {

  const { unidades } = useCampos();

  const expandableIcon = {
    collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
    expanded: <ArrowUpCircleIcon className='h-6 w-6' />
}


  return (
    <>
      <DataTable
        columns={columnsTablaDivisiones}
        data={unidades}
        pagination
        expandableRows
        expandableRowsComponent={expandedComponentsUnidades}
        customStyles={customStyles} 
        responsive={true}
        striped={true}
        highlightOnHover={true}
        noDataComponent="No hay denuncias para mostrar"
        defaultSortFieldId={"Fecha"}
        defaultSortAsc={false}
        expandableIcon={expandableIcon}
      />
    </>
  )
}

export default TablaUnidades