import { useEffect, useState } from "react";
import { Form, Col } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import LoadingSubmit from "../../Component/Loading/Loading";

import HistoryDate from "../../Component/Dashboard/History";
import { Axios } from "../../Api/axios";
import NavHeader from "../../Component/Dashboard/NavHeader";
import customSelectStyles from "../../Component/Dashboard/customStylesSelect";

export default function AddDeductions() {

  // ================= States =================
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [deductionType, setDeductionType] = useState("");
  const [deductionAmount, setDeductionAmount] = useState("");

  const [absenceType, setAbsenceType] = useState("1");
  const [absenceDeduction, setAbsenceDeduction] = useState("");
  const [absenceDate, setAbsenceDate] = useState(new Date());

  // ================= Effects =================
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await Axios.get("users");
      setEmployees(response.data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= Helpers =================
  const handleValueHire_date = (value) => {
    setAbsenceDate(value);
  };

  const showSuccess = (message) => {
    Swal.fire({
      icon: "success",
      title: message,
      confirmButtonText: "حسناً",
    });
  };

  const showError = (err) => {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: err?.response?.data?.message || "حدث خطأ غير متوقع",
      confirmButtonText: "إغلاق",
    });
  };

  // ================= Deduction =================
  const handleAddDeduction = async () => {
    setLoading(true);

    try {
      await Axios.post("deductions", {
        employee_id: employeeId,
        deduction_type: deductionType,
        amount: deductionAmount,
      });

      showSuccess("تم تسجيل الخصم بنجاح");

      setDeductionType("");
      setDeductionAmount("");
      setEmployeeId(null);

    } catch (err) {
      console.log(err);
      showError(err);

    } finally {
      setLoading(false);
    }
  };

  // ================= Absence =================
  const handleAddAbsence = async () => {
    setLoading(true);

    try {
      await Axios.post("absences", {
        employee_id: employeeId,
        absence_date: absenceDate,
        absence_type: absenceType,
        deduction_amount: absenceType === "1" ? absenceDeduction : 0,
      });

      showSuccess("تم تسجيل الغياب بنجاح");

      setAbsenceDeduction("");
      setEmployeeId(null);

    } catch (err) {
      console.log(err);
      showError(err);

    } finally {
      setLoading(false);
    }
  };

  // ================= Select =================
  const options = employees?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const handleChange = (selected) => {
    setEmployeeId(selected.value);
  };

 

  const links = [
    { name: "إضافة خصم", link: "#" },
  ];

  // ================= Render =================
  return (
    <>
      {loading ? (
        <LoadingSubmit />
      ) : (
        <div className="px-3 py-2 border border-3" style={{ minHeight: "100vh" }}>

          <NavHeader nav={links} />

          {/* ================= Deduction Section ================= */}
          <div className="w-100 fs-5 d-flex justify-content-center gap-lg-4 flex-wrap">

            <Form.Group className="d-flex col-lg-5 col-md-6 col-sm-11 col-12 p-2 flex-wrap align-items-center justify-content-center">
              <Form.Label className="col-6 col-lg-3 col-md-6 col-sm-4 m-0">
                اختر موظف
              </Form.Label>

              <Col lg={9} sm={8} xs={12} md={12}>
                <Select
                  options={options}
                  value={employeeId != null ? employeeId.label : null}
                  name="employeeId"
                  onChange={handleChange}
                  placeholder="اختر موظف"
                  styles={customSelectStyles}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group className="d-flex col-lg-5 col-md-6 col-sm-11 col-12 p-2 flex-wrap align-items-center justify-content-center">
              <Form.Label className="col-6 col-lg-3 col-md-6 col-sm-4 m-0">
                نوع الخصم
              </Form.Label>

              <Col lg={9} sm={8} xs={12} md={12}>
                <Form.Control
                  type="text"
                  placeholder="نوع الخصم"
                  value={deductionType}
                  onChange={(e) => setDeductionType(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="d-flex col-lg-5 col-md-6 col-sm-11 col-12 p-2 flex-wrap align-items-center justify-content-center">
              <Form.Label className="col-6 col-lg-3 col-md-6 col-sm-4 m-0">
                المبلغ
              </Form.Label>

              <Col lg={9} sm={8} xs={12} md={12}>
                <Form.Control
                  type="number"
                  placeholder="المبلغ"
                  value={deductionAmount}
                  onChange={(e) => setDeductionAmount(e.target.value)}
                />
              </Col>
            </Form.Group>

            <div className="d-flex col-lg-5 col-md-6 col-sm-11 col-12 p-2 align-items-center">
              <button className="btn btn-primary w-100" onClick={handleAddDeduction}>
                إضافة الخصم
              </button>
            </div>

          </div>

          {/* ================= Absence Section ================= */}
          <h3 className="border-0 border-top pt-4 mt-5">
            إضافة غياب
          </h3>

          <div className="w-100 fs-5 d-flex justify-content-center gap-lg-4 flex-wrap">

            <Form.Group className="d-flex col-lg-5 col-md-6 col-sm-11 col-12 p-2 flex-wrap align-items-center justify-content-center">
              <Form.Label className="col-6 col-lg-3 col-md-6 col-sm-4 m-0">
                اختر موظف
              </Form.Label>

              <Col lg={9} sm={8} xs={12} md={12}>
                <Select
                  options={options}
                  value={employeeId != null ? employeeId.label : null}
                  name="employeeId"
                  onChange={handleChange}
                  placeholder="اختر موظف"
                  styles={customSelectStyles}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group className="d-flex col-lg-5 col-md-6 col-sm-11 col-12 p-2 flex-wrap align-items-center justify-content-center">
              <Form.Label className="col-6 col-lg-3 col-md-6 col-sm-4 m-0">
                تاريخ الغياب
              </Form.Label>

              <Col lg={9} sm={8} xs={12} md={12}>
                <HistoryDate
                  value={absenceDate}
                  date={absenceDate}
                  setSelectDate={handleValueHire_date}
                />
              </Col>
            </Form.Group>

            <Form.Group className="d-flex col-lg-5 col-md-6 col-sm-11 col-12 p-2 flex-wrap align-items-center justify-content-center">
              <Form.Label className="col-6 col-lg-3 col-md-6 col-sm-4 m-0">
                نوع الغياب
              </Form.Label>

              <fieldset>
                <Form.Group className="mt-3 d-flex gap-3">
                  <Form.Check
                    type="radio"
                    name="absenceType"
                    checked={absenceType === "1"}
                    value="1"
                    onChange={(e) => setAbsenceType(e.target.value)}
                  />
                  <Form.Label>غياب بغير إذن</Form.Label>

                  <Form.Check
                    type="radio"
                    name="absenceType"
                    value="2"
                    onChange={(e) => setAbsenceType(e.target.value)}
                  />
                  <Form.Label>غياب مع إذن</Form.Label>
                </Form.Group>
              </fieldset>
            </Form.Group>

            <Form.Group className="d-flex col-lg-5 col-md-6 col-sm-11 col-12 p-2 flex-wrap align-items-center justify-content-center">
              <Form.Label className="col-6 col-lg-3 col-md-6 col-sm-4 m-0">
                المبلغ المخصوم
              </Form.Label>

              <Col lg={9} sm={8} xs={12} md={12}>
                <Form.Control
                  type="number"
                  placeholder="المبلغ المخصوم"
                  value={absenceDeduction}
                  onChange={(e) => setAbsenceDeduction(e.target.value)}
                  disabled={absenceType === "2"}
                />
              </Col>
            </Form.Group>

          </div>

          <div className="w-100 d-flex align-items-center justify-content-center mt-3">
            <button className="btn btn-primary w-50" onClick={handleAddAbsence}>
              إضافة الغياب
            </button>
          </div>

        </div>
      )}
    </>
  );
}
