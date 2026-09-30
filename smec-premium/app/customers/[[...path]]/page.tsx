import { makeMetadata, makePage, makeStaticParams } from '@/lib/spec/route';

/** /customers/ and everything under it, from the Content Master. */
export const dynamicParams = false;
export const generateStaticParams = makeStaticParams('customers');
export const generateMetadata = makeMetadata('customers');
export default makePage('customers');
