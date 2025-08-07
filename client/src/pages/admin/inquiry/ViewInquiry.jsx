import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

const ViewInquiry = () => {

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="admin-panel-header-div full-height">
        {/* <div
          className="admin-dashboard-main-header"
          style={{ marginBottom: "24px" }}
        >
          <div>
            <h5>View Admin</h5>
            <div className="admin-panel-breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-link active">
                Dashboard
              </Link>
              <IoMdArrowDropright />
              <Link
                to="/admin/manage-admins"
                className="breadcrumb-link active"
              >
                Admin List
              </Link>
              <IoMdArrowDropright />
              <span className="breadcrumb-text">View Admin</span>
            </div>
          </div>
          <div className="admin-panel-header-add-buttons">
            <NavLink
              to="/admin/manage-admins"
              className="primary-btn dashboard-add-product-btn"
            >
              <IoArrowBackSharp /> Back
            </NavLink>
          </div>
        </div> */}
      </main>
    </>
  );
};

export default ViewInquiry;
