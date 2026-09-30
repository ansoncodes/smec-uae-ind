import { makeMetadata, makePage } from '@/lib/spec/route';

/** /contact/ — the RFQ page the whole site points at. */
export const generateMetadata = makeMetadata('contact');
export default makePage('contact');
