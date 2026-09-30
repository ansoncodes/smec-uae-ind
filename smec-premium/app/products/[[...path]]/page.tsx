import { makeMetadata, makePage, makeStaticParams } from '@/lib/spec/route';

/** /products/ and everything under it, from the Content Master. */
export const dynamicParams = false;
export const generateStaticParams = makeStaticParams('products');
export const generateMetadata = makeMetadata('products');
export default makePage('products');
