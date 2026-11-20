import React from 'react';
import { X, Mail } from 'lucide-react';
import { ProductItem } from '../data/products';
import { openWhatsAppEnquiry } from '../utils/whatsapp';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onEnquire?: (productName: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onEnquire,
}) => {
  if (!product) return null;

  const handleEnquireClick = () => {
    openWhatsAppEnquiry(product);
    if (onEnquire) {
      onEnquire(product.name);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-[#F7F3EC] max-w-3xl w-full border border-[#A77B42]/40 shadow-2xl overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-[#382419] text-[#F7F3EC] hover:bg-[#A77B42] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-full bg-black/10">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-[#382419]/90 text-white text-[10px] uppercase tracking-widest px-2.5 py-1">
              {product.category}
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A77B42]">
                Artisanal Woodwork
              </span>
              <h3 className="text-2xl font-serif text-[#382419] mt-1 mb-3">
                {product.name}
              </h3>
              
              <p className="text-xs sm:text-sm text-[#59534C] font-light leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="space-y-2 border-t border-b border-[#EAE0D2] py-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#382419] font-medium">Material / Species:</span>
                  <span className="text-[#59534C] font-light">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#382419] font-medium">Standard Finish:</span>
                  <span className="text-[#59534C] font-light">{product.finish}</span>
                </div>
                {product.dimensions && (
                  <div className="flex justify-between">
                    <span className="text-[#382419] font-medium">Reference Dimensions:</span>
                    <span className="text-[#59534C] font-light">{product.dimensions}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#382419] font-medium">Customisation:</span>
                  <span className="text-[#A77B42] font-medium">Full Bespoke Options</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {product.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-wider bg-[#EAE0D2] text-[#382419] px-2 py-0.5"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleEnquireClick}
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#382419] text-[#F7F3EC] text-xs uppercase tracking-widest font-semibold hover:bg-[#A77B42] transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Enquire For This Creation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
