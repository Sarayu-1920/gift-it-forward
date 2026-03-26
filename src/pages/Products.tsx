import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { productService, Product, PaginatedResponse } from "@/services/productService";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [occasion, setOccasion] = useState(searchParams.get("occasion") || "");
  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(0);
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    productService
      .getProducts({
        category: category || undefined,
        occasion: occasion || undefined,
        sort: sort || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        page,
        size: 8,
      })
      .then(setData)
      .finally(() => setLoading(false));
  }, [category, occasion, sort, minPrice, maxPrice, page]);

  const clearFilters = () => {
    setCategory("");
    setOccasion("");
    setSort("");
    setMinPrice("");
    setMaxPrice("");
    setPage(0);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <p className="text-sm font-semibold tracking-widest text-secondary uppercase mb-2">Curated Collection</p>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">All Gifts</h1>
              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileFilters(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            {data && (
              <p className="text-sm text-muted-foreground mt-1">{data.totalElements} gifts found</p>
            )}
          </div>

          <div className="flex gap-8">
            <FilterSidebar
              category={category}
              occasion={occasion}
              sort={sort}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onCategoryChange={(v) => { setCategory(v); setPage(0); }}
              onOccasionChange={(v) => { setOccasion(v); setPage(0); }}
              onSortChange={(v) => { setSort(v); setPage(0); }}
              onMinPriceChange={setMinPrice}
              onMaxPriceChange={setMaxPrice}
              onClear={clearFilters}
              mobileOpen={mobileFilters}
              onMobileClose={() => setMobileFilters(false)}
            />

            <div className="flex-1">
              {loading ? (
                <Loader text="Finding perfect gifts..." />
              ) : data && data.content && data.content.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {data.content.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {data.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-10">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                      >
                        Previous
                      </Button>
                      {Array.from({ length: data.totalPages }, (_, i) => (
                        <Button
                          key={i}
                          variant={i === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPage(i)}
                          className="w-9"
                        >
                          {i + 1}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page >= data.totalPages - 1}
                        onClick={() => setPage(page + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground font-body">No gifts found matching your filters.</p>
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;