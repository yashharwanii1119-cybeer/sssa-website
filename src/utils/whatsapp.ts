import { ProductItem } from '../data/products';

export const WHATSAPP_NUMBER = '919929291844';

/**
 * Generates dynamic WhatsApp click-to-chat URL for a specific product enquiry.
 * Includes product name, category, subcategory, description (if available),
 * and request for pricing, wood options, dimensions and customization details.
 */
export function getProductWhatsAppUrl(
  product: Pick<ProductItem, 'name' | 'category' | 'subcategory'> & { description?: string }
): string {
  const descPart = product.description ? `\nProduct Description: ${product.description}` : '';

  const message = `Hello Shree Shiv Shakti Art! I am interested in your ${product.name}.

Category: ${product.category}
Subcategory: ${product.subcategory}${descPart}

I would like to know its pricing, available wood options, dimensions and customization possibilities. Please share the quotation.

Thank you.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp click-to-chat URL for general enquiries & floating chat button.
 */
export function getGeneralWhatsAppUrl(): string {
  const message = `Hello Shree Shiv Shakti Art! I visited your website and would like to know more about your wooden furniture and handicraft collections. Could you please assist me with product details and pricing?`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp click-to-chat URL for quote requests & custom inquiry CTAs.
 */
export function getQuoteWhatsAppUrl(topic?: string): string {
  const topicLine = topic ? ` regarding: ${topic}` : '';
  const message = `Hello Shree Shiv Shakti Art! I would like to request a quotation${topicLine}.

Please share pricing, catalogue options, lead times, and custom manufacturing specifications for export.

Thank you.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens a WhatsApp enquiry link in a new tab securely.
 */
export function openWhatsAppEnquiry(
  productOrTopic?: (Pick<ProductItem, 'name' | 'category' | 'subcategory'> & { description?: string }) | string | null
): void {
  let url: string;
  if (!productOrTopic) {
    url = getGeneralWhatsAppUrl();
  } else if (typeof productOrTopic === 'string') {
    url = getQuoteWhatsAppUrl(productOrTopic);
  } else {
    url = getProductWhatsAppUrl(productOrTopic);
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}
