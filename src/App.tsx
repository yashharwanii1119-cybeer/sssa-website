import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Collections } from './components/Collections';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Craftsmanship } from './components/Craftsmanship';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { AllCollectionsPage } from './components/AllCollectionsPage';
import { ProductItem } from './data/products';
import { CollectionItem } from './data/collections';

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'collections'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [enquiryInitialSubject, setEnquiryInitialSubject] = useState<string>('');

  // Handle browser URL hash or popstate navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#all-collections' || hash.startsWith('#collections-page')) {
        setCurrentPage('collections');
      } else {
        setCurrentPage('home');
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
    // If on collections page, switch to home to scroll to contact section
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

  const handleNavigateAllCollections = (categoryName: string = 'All Products') => {
    setSelectedCategory(categoryName);
    setCurrentPage('collections');
    window.history.pushState(null, '', '#all-collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
    window.history.pushState(null, '', '#home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCollection = (collection: CollectionItem) => {
    handleNavigateAllCollections(collection.title);
  };

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#25221F] selection:bg-[#A77B42] selection:text-white flex flex-col font-sans">
      <Navbar
        onOpenEnquiry={handleOpenEnquiry}
        onNavigateHome={handleNavigateHome}
        onNavigateCollections={handleNavigateAllCollections}
        currentPage={currentPage}
      />

      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            <Hero onOpenEnquiry={handleOpenEnquiry} />
            <About onOpenEnquiry={handleOpenEnquiry} />
            <Collections
              onSelectCollection={handleSelectCollection}
              onNavigateAllCollections={() => handleNavigateAllCollections('All Products')}
            />
            <FeaturedProducts
              onOpenEnquiry={handleOpenEnquiry}
              onViewProductModal={(prod) => setSelectedProduct(prod)}
            />
            <Craftsmanship />
            <Contact initialSubject={enquiryInitialSubject} />
          </>
        ) : (
          <AllCollectionsPage
            onBackToHome={handleNavigateHome}
            onOpenEnquiry={handleOpenEnquiry}
            onViewProductModal={(prod) => setSelectedProduct(prod)}
            initialCategory={selectedCategory}
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
        onEnquire={(prodName) => handleOpenEnquiry(`Product: ${prodName}`)}
      />
    </div>
  );
}

export default App;
