import { makeMetadata, makePage, makeStaticParams } from '@/lib/spec/route';

/** /digital/ and everything under it, from the Content Master. */
export const dynamicParams = false;
export const generateStaticParams = makeStaticParams('digital');
export const generateMetadata = makeMetadata('digital');
export default makePage('digital');
