import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalItems,
}) => {
  return (
    <div className="table-footer-pagination">
      <span>
        Showing {startIndex + 1}-{Math.min(endIndex, totalItems)}&nbsp;of&nbsp;
        {totalItems}
      </span>
      <ul className="pagination">
        <li
          className={`arrow ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <HiOutlineArrowLeft />
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1 < 10 ? `0${i + 1}` : i + 1}
          </li>
        ))}
        <li
          className={`arrow ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <HiOutlineArrowRight />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
