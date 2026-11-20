import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Collections } from './components/Collections';
import { Craftsmanship } from './components/Craftsmanship';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { AllCollectionsPage } from './components/AllCollectionsPage';
import { SubCategoryPage } from './components/SubCategoryPage';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { ProductItem } from './data/products';
import { CollectionItem, collectionsData, getCategoryBySlug, getSubCategoryBySlug } from './data/collections';
import { openWhatsAppEnquiry } from './utils/whatsapp';

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'collections' | 'subcategory'>('home');
  const [currentCategorySlug, setCurrentCategorySlug] = useState<string>('all');
  const [currentSubCategorySlug, setCurrentSubCategorySlug] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [enquiryInitialSubject, setEnquiryInitialSubject] = useState<string>('');

  // Handle browser URL hash or popstate navigation
  // Formats supported:
  // #home
  // #collections or #all-collections
  // #collections/living-room
  // #collections/living-room/cabinets
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');

      if (!hash || hash === 'home' || hash === 'about' || hash === 'craftsmanship' || hash === 'contact') {
        setCurrentPage('home');
        return;
      }

      if (hash === 'collections' || hash === 'all-collections') {
        setCurrentPage('collections');
        setCurrentCategorySlug('all');
        return;
      }

      // Check for /collections/:category or /collections/:category/:subcategory
      if (hash.startsWith('collections/')) {
        const parts = hash.split('/').filter(Boolean); // ['collections', 'living-room', 'cabinets']
        if (parts.length === 2) {
          // Category page
          setCurrentPage('collections');
          setCurrentCategorySlug(parts[1]);
        } else if (parts.length >= 3) {
          // Subcategory page
          const cat = getCategoryBySlug(parts[1]);
          const sub = getSubCategoryBySlug(parts[1], parts[2]);
          if (cat && sub) {
            setCurrentPage('subcategory');
            setCurrentCategorySlug(parts[1]);
            setCurrentSubCategorySlug(parts[2]);
          } else {
            setCurrentPage('collections');
            setCurrentCategorySlug(parts[1]);
          }
        }
      }
    };

    window.addEventListener('popstate', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  const handleOpenEnquiry = (subject?: string) => {
    if (subject) {
      setEnquiryInitialSubject(subject);
    }
    // If not on home page, switch to home to scroll to contact section
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.history.pushState(null, '', '#contact');
      setTimeout(() => {
        const contactElem = document.getElementById('contact');
        if (contactElem) {
          contactElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateAllCollections = (categorySlug: string = 'all') => {
    setCurrentPage('collections');
    setCurrentCategorySlug(categorySlug);
    if (categorySlug === 'all') {
      window.history.pushState(null, '', '#collections');
    } else {
      window.history.pushState(null, '', `#collections/${categorySlug}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSubcategory = (categorySlug: string, subcategorySlug: string) => {
    const cat = getCategoryBySlug(categorySlug);
    const sub = getSubCategoryBySlug(categorySlug, subcategorySlug);
    if (cat && sub) {
      setCurrentCategorySlug(categorySlug);
      setCurrentSubCategorySlug(subcategorySlug);
      setCurrentPage('subcategory');
      window.history.pushState(null, '', `#collections/${categorySlug}/${subcategorySlug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleNavigateAllCollections(categorySlug);
    }
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
    window.history.pushState(null, '', '#home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCollection = (collection: CollectionItem) => {
    handleNavigateAllCollections(collection.slug);
  };

  const currentCategoryObj = getCategoryBySlug(currentCategorySlug) || collectionsData[0];
  const currentSubCategoryObj =
    getSubCategoryBySlug(currentCategorySlug, currentSubCategorySlug) ||
    currentCategoryObj.subcategories[0];

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#25221F] selection:bg-[#A77B42] selection:text-white flex flex-col font-sans">
      <Navbar
        onOpenEnquiry={handleOpenEnquiry}
        onNavigateHome={handleNavigateHome}
        onNavigateCollections={handleNavigateAllCollections}
        onNavigateSubcategory={handleNavigateSubcategory}
        currentPage={currentPage}
      />

      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero onOpenEnquiry={handleOpenEnquiry} />
            <About onOpenEnquiry={handleOpenEnquiry} />
            <Collections
              onSelectCollection={handleSelectCollection}
              onNavigateAllCollections={() => handleNavigateAllCollections('all')}
            />
            <Craftsmanship />
            <Contact initialSubject={enquiryInitialSubject} />
          </>
        )}

        {currentPage === 'collections' && (
          <AllCollectionsPage
            onBackToHome={handleNavigateHome}
            onOpenEnquiry={handleOpenEnquiry}
            onViewProductModal={(prod) => setSelectedProduct(prod)}
            onSelectCategory={handleNavigateAllCollections}
            onSelectSubcategory={handleNavigateSubcategory}
            initialCategorySlug={currentCategorySlug}
          />
        )}

        {currentPage === 'subcategory' && (
          <SubCategoryPage
            category={currentCategoryObj}
            subcategory={currentSubCategoryObj}
            onBackToHome={handleNavigateHome}
            onBackToCollections={() => handleNavigateAllCollections('all')}
            onSelectCategory={handleNavigateAllCollections}
            onSelectOtherSubcategory={handleNavigateSubcategory}
            onOpenEnquiry={handleOpenEnquiry}
            onViewProductModal={(prod) => setSelectedProduct(prod)}
          />
        )}
      </main>

      <Footer
        onOpenEnquiry={handleOpenEnquiry}
        onNavigateHome={handleNavigateHome}
        onNavigateCollections={handleNavigateAllCollections}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onEnquire={(prodName) => {
          if (selectedProduct) {
            openWhatsAppEnquiry(selectedProduct);
          } else {
            openWhatsAppEnquiry(prodName);
          }
        }}
      />

      <FloatingWhatsAppButton />
    </div>
  );
}

export default App;
