import CompanyRoute, { companyMetadata } from '@/components/page/CompanyRoute';

export const metadata = companyMetadata('solutions-and-services');

export default function Page() {
  return <CompanyRoute slug="solutions-and-services" />;
}
