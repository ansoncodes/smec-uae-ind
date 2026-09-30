import { makeMetadata, makePage, makeStaticParams } from '@/lib/spec/route';

/** /solutions/ and everything under it, from the Content Master. */
export const dynamicParams = false;
export const generateStaticParams = makeStaticParams('solutions');
export const generateMetadata = makeMetadata('solutions');
export default makePage('solutions');
