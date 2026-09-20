export default function Pagination({ page = 1, pages = 1, onPrevious, onNext }) {
  return (
    <div className="pagination">
      <button type="button" className="button button-secondary" onClick={onPrevious} disabled={page <= 1}>
        Prev
      </button>
      <span className="pagination-info">Page {page} of {pages}</span>
      <button type="button" className="button button-secondary" onClick={onNext} disabled={page >= pages}>
        Next
      </button>
    </div>
  )
}
