import { makeMetadata, makePage, makeStaticParams } from '@/lib/spec/route';

/** /resources/ and everything under it, from the Content Master. */
export const dynamicParams = false;
export const generateStaticParams = makeStaticParams('resources');
export const generateMetadata = makeMetadata('resources');
export default makePage('resources');
