import { redirect } from 'next/navigation';

export default async function Dashboard() {
  return redirect('/public-register/search');
}
