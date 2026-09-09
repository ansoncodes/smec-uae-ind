import CompanyRoute, { companyMetadata } from '@/components/page/CompanyRoute';

export const metadata = companyMetadata('about-us');

export default function Page() {
  return <CompanyRoute slug="about-us" />;
}
