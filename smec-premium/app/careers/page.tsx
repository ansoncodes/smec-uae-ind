import CompanyRoute, { companyMetadata } from '@/components/page/CompanyRoute';

export const metadata = companyMetadata('careers');

export default function Page() {
  return <CompanyRoute slug="careers" />;
}
