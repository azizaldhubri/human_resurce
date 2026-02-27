LeaveApproval
const handleApproval = (leaveId, status) => {
    fetch(`http://localhost:8000/api/leave-requests/${leaveId}/approve`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ status })
    })
    .then(response => response.json())
    .then(() => {
        alert("تم تحديث الحالة بنجاح!");
        fetchLeaves(); // إعادة تحميل البيانات
    })
    .catch(error => console.error("Error updating leave status:", error));
};
