import { makeMetadata, makePage, makeStaticParams } from '@/lib/spec/route';

/** /company/ and everything under it, from the Content Master. */
export const dynamicParams = false;
export const generateStaticParams = makeStaticParams('company');
export const generateMetadata = makeMetadata('company');
export default makePage('company');
