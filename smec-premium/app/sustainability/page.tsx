import CompanyRoute, { companyMetadata } from '@/components/page/CompanyRoute';

export const metadata = companyMetadata('sustainability');

export default function Page() {
  return <CompanyRoute slug="sustainability" />;
}
