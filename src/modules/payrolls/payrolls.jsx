import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import TableShow from "../../Component/Dashboard/Table";
import NavHeader from "../../Component/Dashboard/NavHeader";
import LoadingSubmit from "../../Component/Loading/Loading";
import ExportExcel from "../../Component/Dashboard/ExportExcel";
import ExportPdf from "../../Component/Dashboard/ExportPdf";
import Table_documents from "../../Component/Dashboard/Table_document";
export default function Payrolls() {

    const [payrolls, setPayrolls] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [loading, setLoading] = useState(false);

    // 📌 التاريخ الحالي
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // 📌 اختيار الشهر والسنة
    const [selectedDate, setSelectedDate] = useState("");

    // استخراج الشهر والسنة
    const getSelectedMonthYear = () => {
        if (selectedDate) {
            const [year, month] = selectedDate.split("-");
            return { month, year };
        }
        return { month: currentMonth, year: currentYear };
    };

    // ================================
    // 📌 جلب الرواتب
    // ================================
    const fetchPayrolls = async () => {
        const { month, year } = getSelectedMonthYear();

        try {
            const response = await Axios.get(
                `payrolls?limit=${limit}&page=${page}&month=${month}&year=${year}`
            );
            setPayrolls(response.data.data);
            console.log(response.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    // ================================
    // 📌 تحديث الرواتب
    // ================================
    const getAllPayrolls = async () => {
        const { month, year } = getSelectedMonthYear();

        try {
            await Axios.post("update_payroll", { month, year });
            fetchPayrolls();
        } catch (err) {
            console.log(err);
            fetchPayrolls();
        }
    };

    // ================================
    // 📌 ترحيل الأرصدة
    // ================================
    const handleCarryForward = async () => {
        setLoading(true);
        try {
            await Axios.post('carry-forward-advances');
            fetchPayrolls();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    // تحديث تلقائي عند تغيير limit أو page أو التاريخ
    useEffect(() => {
        getAllPayrolls();
    }, [limit, page, selectedDate]);

    // ================================
    // 📌 أعمدة الجدول
    // ================================
    const header = [
        
        // { key: 'employee_name', name: 'الاسم' },
        { key: 'employee.name', name: 'الاسم' },
        { key: 'basic_salary', name: 'الراتب الأساسي' },
        { key: 'total_allowances', name: 'البدلات' },
        { key: 'total_deductions', name: 'الخصومات' },
        { key: 'net_salary', name: 'الراتب الصافي' },         
        { key: 'month_year', name: 'مرتب شهر' },
    ];

    const links = [
        { name: 'عرض المرتبات', link: '#' },
    ];
 
    return (
        <>
            {loading && <LoadingSubmit />}

            <div className="ps-2 pe-2 mt-2">

                <NavHeader nav={links} />

                {/* اختيار الشهر */}
                <div className="d-flex gap-3 mb-3 align-items-center">

                    <label className="fw-bold">اختر الشهر:</label>

                    <input
                        type="month"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="form-control"
                        style={{ maxWidth: "200px" }}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={getAllPayrolls}
                    >
                        عرض
                    </button>
                </div>

                {/* تنبيه ترحيل الأرصدة */}
                <div className="d-flex align-items-center gap-3 mb-2">
                    <p className="m-0">
                        يجب ترحيل الأرصدة من الشهر السابق إذا لم يتم ترحيلها هذا الشهر
                    </p>
                    <button
                        className="btn btn-warning"
                        onClick={handleCarryForward}
                    >
                        ترحيل
                    </button>
                </div>

                {/* جدول الرواتب */}
                {/* <TableShow
                    limit={limit}
                    setLimit={setLimit}
                    page={page}
                    header={header}
                    data={payrolls}
                    setPage={setPage}
                    loading={loading}
                    edit=''
                    total={0}
                    search='name'
                    Linksearch={payrolls}
                    role=''
                /> */}

                <Table_documents
                 limit={limit}
                    setLimit={setLimit}
                    page={page}
                    header={header}
                    data={payrolls}
                    setPage={setPage}
                    loading={loading}
                    edit=''
                    total={0}
                    search='name'
                    Linksearch={payrolls}
                    role=''
                />

                <div className=' d-flex gap-3 w-50 align-items-center mt-3 '>
                             
                    <ExportExcel
                    data={payrolls}
                    header={header} />              
        
                    <ExportPdf 
                    header={header}
                    data={payrolls}  
                        />
                    
                 </div> 

            </div>
        </>
    );
}