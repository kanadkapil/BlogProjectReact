import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center mt-10 space-x-2 flex-wrap">
            <button
                className="btn btn-sm btn-outline"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                « Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline'
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                className="btn btn-sm btn-outline"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next »
            </button>
        </div>
    );
};

export default Pagination;
