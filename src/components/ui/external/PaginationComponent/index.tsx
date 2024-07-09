'use client';

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationStart,
  PaginationEnd,
} from '../../pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
};

const PaginationComponent: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  itemsPerPage,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const shouldShowEllipsis = totalPages > 5;

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set('page', `${page}`);
    } else {
      params.delete('page');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <>
            <PaginationItem>
              <PaginationStart onClick={() => handlePagination(1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePagination(currentPage - 1)}
              />
            </PaginationItem>
          </>
        )}

        {/* Item halaman */}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  className=""
                  onClick={() => handlePagination(pageNumber)}
                  isActive={pageNumber === currentPage}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (
            shouldShowEllipsis &&
            (pageNumber === 2 || pageNumber === totalPages - 1)
          ) {
            return <PaginationEllipsis key={pageNumber} />;
          }
          return null;
        })}

        {currentPage < totalPages && (
          <>
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePagination(currentPage + 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationEnd onClick={() => handlePagination(totalPages)} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
