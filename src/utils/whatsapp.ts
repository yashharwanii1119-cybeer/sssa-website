import { ProductItem } from '../data/products';

export const WHATSAPP_NUMBER = '919929291844';

/**
 * Generates dynamic WhatsApp click-to-chat URL for a specific product enquiry.
 */
export function getProductWhatsAppUrl(product: Pick<ProductItem, 'name' | 'category' | 'subcategory'>): string {
  const message = `Hello Shree Shiv Shakti Art,

I am interested in enquiring about the following product:

Product Name: ${product.name}
Category: ${product.category}
Subcategory: ${product.subcategory}

I would like to know more about its pricing, available customization options, materials and export availability.

Please share further details.

Thank you.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp click-to-chat URL for general enquiries.
 */
export function getGeneralWhatsAppUrl(): string {
  const message = `Hello Shree Shiv Shakti Art,

I would like to know more about your wooden handicraft furniture collections and manufacturing services.

Please get in touch with me.

Thank you.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens a WhatsApp enquiry link in a new tab securely.
 */
export function openWhatsAppEnquiry(product?: Pick<ProductItem, 'name' | 'category' | 'subcategory'> | null): void {
  const url = product ? getProductWhatsAppUrl(product) : getGeneralWhatsAppUrl();
  window.open(url, '_blank', 'noopener,noreferrer');
}
