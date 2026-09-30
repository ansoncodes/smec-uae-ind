import { makeMetadata, makePage, makeStaticParams } from '@/lib/spec/route';

/** /industries/ and everything under it, from the Content Master. */
export const dynamicParams = false;
export const generateStaticParams = makeStaticParams('industries');
export const generateMetadata = makeMetadata('industries');
export default makePage('industries');
