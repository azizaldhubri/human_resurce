import * as XLSX from 'xlsx';

export default function ExportExcel({ data, header,  fileName = 'employees' }) {
 
  // دالة للحصول على قيمة مفتاحية متداخلة أو حسب الحالات
  const getCellValue = (row, key) => {
    switch(key) {  
      case 'status':
        if(row.status==='pending') return 'قيد الانتظار';
        if(row.status==='approved') return 'موافق عليه';
        if(row.status==='rejected') return 'مرفوض';
        return row.status;
      case 'month_year':
        return `${row.month}/${row.year}`;
      case 'created_at':
      case 'updated_at':
        return row[key] ? new Date(row[key]).toLocaleDateString('ar-EG') : '';
      case 'file_paths':
        return row.file_paths?.join(', ') || 'لا توجد مرفقات';
      default:
        // تحقق من الحقول المتداخلة باستخدام النقطة
        if(key.includes('.')) {
          return key.split('.').reduce((acc, k) => acc?.[k] ?? '', row);
        }
        return row[key] ?? '';
    }
  };

  const exportSelectedColumnsToExcel = () => {
    if(!data || !header) return;

    const selectedData = data.map(row  => {
      const newRow = {};    

      header.forEach(column => {
        newRow[column.name] = getCellValue(row, column.key);
      });
      return newRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <div>
      <button className='btn btn-primary' onClick={exportSelectedColumnsToExcel}>
        Export Excel
      </button>
    </div>
  );
}