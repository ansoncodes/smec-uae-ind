import CompanyRoute, { companyMetadata } from '@/components/page/CompanyRoute';

export const metadata = companyMetadata('research-and-developement');

export default function Page() {
  return <CompanyRoute slug="research-and-developement" />;
}
