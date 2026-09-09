import CompanyRoute, { companyMetadata } from '@/components/page/CompanyRoute';

export const metadata = companyMetadata('privacy-policy');

export default function Page() {
  return <CompanyRoute slug="privacy-policy" />;
}
