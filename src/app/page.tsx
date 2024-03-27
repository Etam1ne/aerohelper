import { redirect } from 'next/navigation';
import { PagesEnum } from '../enums';

export default function Home() {
  redirect(PagesEnum.DOCUMENTS)
}
