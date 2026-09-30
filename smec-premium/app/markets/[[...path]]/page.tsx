import { makeMetadata, makePage, makeStaticParams } from '@/lib/spec/route';

/** /markets/ and everything under it, from the Content Master. */
export const dynamicParams = false;
export const generateStaticParams = makeStaticParams('markets');
export const generateMetadata = makeMetadata('markets');
export default makePage('markets');
