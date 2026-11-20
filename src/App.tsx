import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Collections } from './components/Collections';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Craftsmanship } from './components/Craftsmanship';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { ProductItem } from './data/products';
import { CollectionItem } from './data/collections';

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [enquiryInitialSubject, setEnquiryInitialSubject] = useState<string>('');

  const handleOpenEnquiry = (subject?: string) => {
    if (subject) {
      setEnquiryInitialSubject(subject);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCollection = (collection: CollectionItem) => {
    handleOpenEnquiry(`Collection Inquiry: ${collection.title}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#25221F] selection:bg-[#A77B42] selection:text-white flex flex-col font-sans">
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      <main className="flex-grow">
        <Hero onOpenEnquiry={handleOpenEnquiry} />
        <About onOpenEnquiry={handleOpenEnquiry} />
        <Collections onSelectCollection={handleSelectCollection} />
        <FeaturedProducts
          onOpenEnquiry={handleOpenEnquiry}
          onViewProductModal={(prod) => setSelectedProduct(prod)}
        />
        <Craftsmanship />
        <Contact initialSubject={enquiryInitialSubject} />
      </main>

      <Footer onOpenEnquiry={handleOpenEnquiry} />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onEnquire={(prodName) => handleOpenEnquiry(`Product: ${prodName}`)}
      />
    </div>
  );
}

export default App;
