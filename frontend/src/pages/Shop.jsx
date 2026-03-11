import { useState, useMemo, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, ChevronDown, Check } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { getProducts, getCategories } from '../api'
import CookieCard from '../components/shop/CookieCard'

// ── Custom Themed Dropdown ──────────────────────────────────────────────────
const CustomDropdown = ({ value, onChange, options, icon: Icon }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = options.find(o => o.value === value)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className={`
          flex items-center gap-2 px-5 py-3 rounded-2xl font-display font-semibold text-sm tracking-wide
          border transition-all duration-200 min-w-[155px] justify-between
          ${open
            ? 'bg-cookie text-white border-cookie shadow-lg shadow-cookie/20'
            : 'bg-white text-cookie-dark/80 border-cookie-light/20 hover:border-cookie hover:text-cookie hover:shadow-md'
          }
        `}
      >
        <span>{selected?.label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div
          className="
            absolute top-full mt-2 left-0 z-50 min-w-full
            bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl
            border border-cookie-light/20 overflow-hidden
            animate-in fade-in slide-in-from-top-2 duration-200
          "
        >
          {/* Decorative top accent */}
          <div className="h-1 bg-gradient-to-r from-cookie-light via-cookie to-cookie-dark w-full" />

          <div className="p-2">
            {options.map((opt) => {
              const isSelected = opt.value === value
              return (
                <button
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setOpen(false) }}
                  className={`
                    w-full flex items-center justify-between px-4 py-2.5 rounded-xl
                    text-sm font-display font-medium tracking-wide transition-all duration-150 text-left
                    ${isSelected
                      ? 'bg-cookie/10 text-cookie font-semibold'
                      : 'text-cookie-dark/70 hover:bg-primary-100 hover:text-cookie-dark'
                    }
                  `}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-cookie flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Shop Component ─────────────────────────────────────────────────────
const Shop = () => {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all')
  const [dietaryFilter, setDietaryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setCategoryFilter(cat)
  }, [searchParams])

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...(categories?.map(cat => ({ value: cat.slug, label: cat.name })) || [])
  ]

  const dietaryOptions = [
    { value: 'all', label: 'Any Dietary' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten Free' },
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
  ]

  const filteredProducts = useMemo(() => {
    if (!products) return []
    let result = [...products]

    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (categoryFilter !== 'all') result = result.filter(p => p.category?.slug === categoryFilter)
    if (dietaryFilter !== 'all') result = result.filter(p => p.dietaryTags?.includes(dietaryFilter))
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'popular') result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))

    return result
  }, [products, search, categoryFilter, dietaryFilter, sortBy])

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-display font-bold text-cookie-dark">The Cookie Shop</h1>
        <p className="text-cookie-dark/60 max-w-xl mx-auto font-medium">Browse our freshly baked collection and find your new favorite crumb.</p>
      </div>

      {/* Filters Hub */}
      <div className="sticky top-24 z-30 flex flex-col md:flex-row gap-4 items-center justify-between glass p-4 rounded-3xl border border-cookie-light/10 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cookie-dark/40" />
          <input
            type="text"
            placeholder="Search for cookies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white focus:outline-none border border-cookie-light/10 focus:border-cookie transition-colors font-medium"
          />
        </div>

        {/* Custom Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <CustomDropdown
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={categoryOptions}
          />
          <CustomDropdown
            value={dietaryFilter}
            onChange={setDietaryFilter}
            options={dietaryOptions}
          />
          <CustomDropdown
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
          />
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="h-[400px] bg-white rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((cookie) => (
            <CookieCard key={cookie.id} product={cookie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-40 space-y-4">
          <div className="w-20 h-20 bg-cookie-cream rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-cookie-light" />
          </div>
          <h3 className="text-2xl font-bold text-cookie-dark">No cookies found</h3>
          <p className="text-cookie-dark/60">Try adjusting your filters or search terms.</p>
          <button
            onClick={() => { setSearch(''); setCategoryFilter('all'); setDietaryFilter('all'); }}
            className="text-cookie font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Shop
